import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserType } from '../users/entities/user.entity'
import { UserConsent } from '../users/entities/user-consent.entity'
import { UserRole, Role } from '../users/entities/user-role.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserConsent) private consentRepo: Repository<UserConsent>,
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>
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

      const userConsent = this.consentRepo.create({
        user: savedUser,
        privacy_policy_version: '1.1',
      })
      await queryRunner.manager.save(userConsent)

      const defaultRole = this.userRoleRepo.create({
        user: savedUser,
        role: Role.USER,
      })
      await queryRunner.manager.save(defaultRole)

      await queryRunner.commitTransaction()

      return savedUser
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException('Registration failed')
    } finally {
      await queryRunner.release()
    }
  }
}
