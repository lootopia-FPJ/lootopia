import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { EmailService } from '../email/email.service'
import User from '../users/entities/user.entity'
import UserConsent from '../users/entities/user-consent.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { Role, RoleName } from '../users/entities/role.entity'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserConsent) private consentRepo: Repository<UserConsent>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private emailService: EmailService,
    private jwtService: JwtService
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

  async login(loginDto: { email: string; password: string }, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: loginDto.email },
      relations: ['roles'],
      select: ['id', 'email', 'nickname', 'password_hash', 'is_active', 'type'],
    })

    if (!user || !(await bcrypt.compare(loginDto.password, user.password_hash))) {
      throw new UnauthorizedException('Invalid email or password')
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Your account is not activated.')
    }

    const role = user.roles.length > 0 ? user.roles[0].name : 'USER'

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      type: user.type,
      role,
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400000,
    })

    return {
      message: 'Login successful',
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        type: user.type,
        role,
        nickname: user.nickname,
      },
    }
  }
}
