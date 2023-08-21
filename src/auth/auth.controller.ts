import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto } from './dto/sign-admin.dto';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authService: AuthService
  ) {}

  @Post('send-code')
  @ApiBody({schema: {properties: {email: {type: 'string', example: 'm2110501@edu.misis.ru'}}}})
  sendMail(@Body('email') email: string){
      return this.authService.sendVerificationCode(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-user')
  async signInUser(@Body() dto: SignInUserDto) {
    return await this.authService.signInUser(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-admin')
  async signInAdmin(@Body() dto: SignInAdminDto) {
    return await this.authService.signInAdmin(dto);
  }
}