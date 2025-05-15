import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginInput, LoginPayload } from 'models';
import { ApiGenericResponse } from 'src/utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // @ApiGenericResponse(RegisterPayload, 'CREATE', 'USER')
  // @Post('register')
  // async create(@Body() registerInput: RegisterInput): Promise<RegisterPayload> {
  //   return await this._authService.register(registerInput);
  // }

  // @ApiGenericResponse(LoginPayload, 'CREATE', 'USER')
  // @Post('login')
  // async login(@Body() loginInput: LoginInput, @Req() req: Request) {
  //   return await this._authService.login(loginInput, req.headers['user-agent']);
  // }

  // @ApiGenericResponse(UpdateRegistrationStatePayload, 'UPDATE', 'USER')
  // @Put('registration-state')
  // async updateRegistrationState(
  //   @Body() updateRegistrationStateInput: UpdateRegistrationStateInput,
  // ): Promise<UpdateRegistrationStatePayload> {
  //   return await this._authService.updateRegistrationState(
  //     updateRegistrationStateInput,
  //   );
  // }

  // @ApiGenericResponse(ForgotPassWordPayload, 'CREATE', 'USER')
  // @Post('forgot-password')
  // async forgotPassword(
  //   @Body() forgotPassWordInput: ForgotPassWordInput,
  // ): Promise<ForgotPassWordPayload> {
  //   return await this._authService.forgotPassword(forgotPassWordInput);
  // }

  // @ApiGenericResponse(ResetPasswordPayload, 'UPDATE', 'USER')
  // @Post('reset-password')
  // async resetPassword(
  //   @Body() resetPasswordInput: ResetPasswordInput,
  // ): Promise<ResetPasswordPayload> {
  //   return await this._authService.resetPassword(resetPasswordInput);
  // }
}
