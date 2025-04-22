import { Controller, Post, Body, Get, Query, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailService } from '../email/email.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { Response } from 'express'
import { seconds, Throttle } from '@nestjs/throttler'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { Request } from 'express'
import { Req } from '@nestjs/common'

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
  getMe(@CurrentUser() user: any) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      type: user.type,
      nickname: user.nickname,
      phone_number: user.phone_number,
      profile_picture: user.profile_picture,
    }
  }

  @Get('activate')
  async activateAccount(@Query('token') token: string) {
    return this.emailService.activateAccount(token)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    return { message: 'Logout successful' }
  }

  @Get('check-session')
  checkSession(@Req() req: Request) {
    const token = req.cookies?.jwt
    if (token) {
      return { hasSession: true }
    }
    return { hasSession: false }
  }
}
