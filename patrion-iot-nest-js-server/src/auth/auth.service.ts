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

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
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
