import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString, IsUrl } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  phone_number?: string

  @IsOptional()
  @IsUrl()
  profile_picture?: string
}
