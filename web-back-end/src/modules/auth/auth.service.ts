/* eslint-disable max-lines-per-function */

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserType } from '../users/entities/user.entity'
import { UserConsent } from '../users/entities/user-consent.entity'
import { UserRole, Role } from '../users/entities/user-role.entity'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { EmailService } from '../email/email.service'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserConsent) private consentRepo: Repository<UserConsent>,
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async register({
    email,
    password,
    name,
    type,
  }: {
    email: string
    password: string
    name: string
    type: string
  }) {
    const existingUser = await this.userRepo.findOne({ where: { email } })
    if (existingUser) {
      throw new BadRequestException('User already exists')
    }

    const queryRunner = this.userRepo.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = this.userRepo.create({
        email,
        password_hash: hashedPassword,
        nickname: name,
        type: type as UserType,
        is_active: false,
      })

      const savedUser = await queryRunner.manager.save(user)

      await queryRunner.manager.save(
        this.consentRepo.create({
          user: savedUser,
          privacy_policy_version: '1.1',
        })
      )

      await queryRunner.manager.save(
        this.userRoleRepo.create({
          user: savedUser,
          role: Role.USER,
        })
      )

      await this.emailService.sendActivationEmail(savedUser.email, savedUser.id)

      await queryRunner.commitTransaction()

      return savedUser
    } catch (error) {
      this.logger.error('Registration failed', (error as any).stack)
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException('Registration failed')
    } finally {
      await queryRunner.release()
    }
  }
}
