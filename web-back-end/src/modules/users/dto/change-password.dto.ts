import { IsNotEmpty, MinLength, Matches } from 'class-validator'

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Au moins une majuscule' })
  @Matches(/[a-z]/, { message: 'Au moins une minuscule' })
  @Matches(/[0-9]/, { message: 'Au moins un chiffre' })
  @Matches(/[@$!%*?&]/, { message: 'Au moins un caractère spécial' })
  newPassword!: string
}
