import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailService } from '../email/email.service'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body)
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return this.emailService.activateAccount(token)
  }
}
