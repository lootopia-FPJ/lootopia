import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User } from '../users/entities/user.entity'
import { UserConsent } from '../users/entities/user-consent.entity'
import { UserRole } from '../users/entities/user-role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserConsent, UserRole])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
