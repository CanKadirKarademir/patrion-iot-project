import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginInput, LoginPayload } from 'models';
import { ApiGenericResponse } from 'src/utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiGenericResponse(LoginPayload, 'CONNECTION', 'USER')
  @Post('login')
  async login(@Body() loginInput: LoginInput): Promise<LoginPayload> {
    return await this._authService.login(loginInput);
  }
}
