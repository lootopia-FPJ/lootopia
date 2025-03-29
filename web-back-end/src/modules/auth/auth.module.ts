import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { EmailModule } from '../email/email.module'
import UserConsent from '../users/entities/user-consent.entity'
import User from '../users/entities/user.entity'
import { Role } from '../users/entities/role.entity'
import { config } from 'dotenv'

config()

@Module({
  imports: [TypeOrmModule.forFeature([User, UserConsent, Role]), EmailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
