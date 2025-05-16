import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CompanyUserEntity, UserEntity } from 'database';
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
    @InjectRepository(CompanyUserEntity)
    private readonly _companyUserRepository: Repository<CompanyUserEntity>,
    private _jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly _name: string = 'USER';

  async login(loginInput: LoginInput): Promise<LoginPayload> {
    const user = await this._userRepository.findOne({
      where: { email: loginInput.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await user.comparePassword(loginInput.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const companyUser = await this._companyUserRepository.findOne({
      where: { userId: user.id },
    });

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: companyUser ? companyUser.companyId : null,
    };

    const token = this._jwtService.sign(tokenPayload, {
      privateKey: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: '7h',
    });

    return {
      ...tokenPayload,
      token,
    };
  }
}
