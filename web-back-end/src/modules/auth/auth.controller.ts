import { Controller, Post, Body, Get, Query, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailService } from '../email/email.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { Response } from 'express'
import { seconds, Throttle } from '@nestjs/throttler'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { AccessTokenPayload } from '../auth/types/access-token-payload.interface'

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

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: seconds(60) } })
  async login(@Body() loginDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@CurrentUser() user: AccessTokenPayload) {
    return user
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return this.emailService.activateAccount(token)
  }
}
