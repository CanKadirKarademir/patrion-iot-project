import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      host: 'localhost',
      port: 1883,
      username: 'user1',
      password: '1234',
    },
  });

  app.enableCors();
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useBodyParser('json', { limit: '10mb' });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3200;
  const swaggerUIConfigs =
    configService.get('STAGE') === 'development'
      ? {
          swaggerOptions: {
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
            authAction: {
              bearer: {
                name: 'bearer',
                schema: {
                  type: 'http',
                  in: 'header',
                  name: 'Authorization',
                  description: '',
                },
                value: configService.get('TOKEN'),
              },
            },
          },
        }
      : {
          swaggerOptions: {
            ui: true,
            raw: ['json'],
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
          },
        };
  //Main Swagger Config
  const config = new DocumentBuilder()
    .setTitle(configService.get('PROJECT_TITLE'))
    .setDescription(configService.get('PROJECT_DESCRIPTION'))
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'bearer', // This is the name of the security scheme)
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerUIConfigs);

  //Question Swagger Config
  const questionConfig = new DocumentBuilder()
    .setTitle(configService.get('QUESTION_TITLE'))
    .setDescription(configService.get('QUESTION_DESCRIPTION'))
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'bearer', // This is the name of the security scheme)
    )
    .build();

  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();
