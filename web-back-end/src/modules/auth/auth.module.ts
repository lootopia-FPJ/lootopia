import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User } from '../users/entities/user.entity'
import { UserConsent } from '../users/entities/user-consent.entity'
import { UserRole } from '../users/entities/user-role.entity'
import { EmailModule } from '../email/email.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserConsent, UserRole]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
