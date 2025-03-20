import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailService } from '../email/email.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string; type: string }) {
    return this.authService.register(body)
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return this.emailService.activateAccount(token)
  }
}
