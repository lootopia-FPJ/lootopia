import { IsNotEmpty, IsStrongPassword } from 'class-validator'

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'password is required.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least one uppercase letter,one lowercase letter,one number and one symbol',
    }
  )
  newPassword!: string
}
