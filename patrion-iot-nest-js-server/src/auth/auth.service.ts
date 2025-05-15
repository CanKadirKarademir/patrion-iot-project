import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload, LoginInput, TokenPayload } from 'models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private _jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly _name: string = 'USER';

  // async login(loginInput: LoginInput, source: string): Promise<LoginPayload> {
  //   let filter = {};
  //   if (loginInput.platform === UserPlatformTypeEnum.mobile) {
  //     if (!loginInput.identityNumber) {
  //       throw new HttpException(
  //         'Identity number is required for mobile platform.',
  //         HttpStatus.EXPECTATION_FAILED,
  //       );
  //     }
  //     filter = {
  //       identityNumber: loginInput.identityNumber,
  //       platform: loginInput.platform,
  //     };
  //   }

  //   if (loginInput.platform === UserPlatformTypeEnum.web) {
  //     if (!loginInput.email) {
  //       throw new HttpException(
  //         'Email is required for web platform.',
  //         HttpStatus.EXPECTATION_FAILED,
  //       );
  //     }
  //     filter = {
  //       email: loginInput.email,
  //       platform: loginInput.platform,
  //     };
  //   }
  //   const user = await this._userRepository.findOne({
  //     where: filter,
  //     relations: {
  //       userSubscription: true,
  //     },
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException({
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       message: 'User not found with this email and in this platform.',
  //     });
  //   }

  //   if (user) {
  //     if (!(await user.comparePassword(loginInput.password))) {
  //       throw new UnauthorizedException({
  //         statusCode: HttpStatus.UNAUTHORIZED,
  //         message: 'Invalid password.',
  //       });
  //     } else {
  //       const payload: TokenPayload = {
  //         userId: user.id,
  //         email: user.email,
  //         source: source,
  //       };
  //       return {
  //         userInformation: {
  //           id: user.id,
  //           fullName: user.firstName + ' ' + user.lastName,
  //           identityNumber: user.identityNumber,
  //           email: user.email,
  //           phone: user.phone,
  //           state: user.registrationState,
  //           subscriptionState: user.userSubscription
  //             ? user.userSubscription.subscriptionState
  //             : null,
  //         },
  //         token: await this._jwtService.signAsync(payload, {
  //           privateKey: await this.configService.get('JWT_SECRET_KEY'),
  //           expiresIn: '7d',
  //         }),
  //       };
  //     }
  //   }
  // }
}
