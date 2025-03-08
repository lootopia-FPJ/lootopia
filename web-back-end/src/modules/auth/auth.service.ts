import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserType } from '../users/entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({
      email,
      password_hash: hashedPassword,
      nickname: name,
      type: type as UserType,
      is_active: false,
    })

    return await this.userRepo.save(user)
  }
}
