import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches, IsEnum } from 'class-validator'
import { UserType } from '../../users/entities/user.entity'

export class RegisterUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password!: string

  @IsOptional()
  name?: string

  @IsOptional()
  @IsEnum(UserType, { message: 'Invalid user type' })
  type?: UserType
}
