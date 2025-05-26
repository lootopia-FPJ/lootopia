import { IsInt, Min, IsString } from 'class-validator'

export class CreditWalletDto {
  @IsInt()
  @Min(1)
  amount!: number

  @IsString()
  description!: string
}
