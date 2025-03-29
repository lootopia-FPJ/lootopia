import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { EmailService } from '../email/email.service'
import User from '../users/entities/user.entity'
import UserConsent from '../users/entities/user-consent.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { Role, RoleName } from '../users/entities/role.entity'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserConsent) private consentRepo: Repository<UserConsent>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private emailService: EmailService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userRepo.findOne({ where: { email: registerUserDto.email } })
    if (existingUser) {
      throw new BadRequestException('User already exists')
    }

    const queryRunner = this.userRepo.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10)

      const role = await this.roleRepo.findOne({ where: { name: RoleName.USER } })

      if (!role) {
        throw new InternalServerErrorException('Role not found')
      }

      const user = this.userRepo.create({
        email: registerUserDto.email,
        password_hash: hashedPassword,
        nickname: registerUserDto.name,
        type: registerUserDto.type,
        is_active: false,
      })

      user.roles = [role]

      const savedUser = await queryRunner.manager.save(user)

      await queryRunner.manager.save(
        this.consentRepo.create({
          user: savedUser,
          privacy_policy_version: '1.1',
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
