import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { UserType } from '../entities/user.entity'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsNotEmpty()
  password!: string

  @IsOptional()
  name?: string

  @IsOptional()
  type?: UserType
}
