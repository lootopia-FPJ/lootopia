import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import User from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`User with ${id} is undefined`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`User with ${id} iis undefined`)
    }

    Object.assign(user, updateUserDto)

    user.updated_at = new Date()

    const updatedUser = await this.userRepository.save(user)

    return updatedUser
  }

  async remove(id: number) {
    const result = await this.userRepository.delete({ id })
    if (result.affected === 0) {
      throw new NotFoundException(`User with ${id} is undefined`)
    }
    return { message: 'user delted with success' }
  }
}
