import { DataSource } from 'typeorm';

const dotenv = require('dotenv');
dotenv.config();
export const postgresDataSource = new DataSource({
  type: process.env.TYPEORM_DATABASE_TYPE as any,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT as any,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING as any,
  entities: ['./dist/database/entities/**/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/**/*{.ts,.js}'],
});
