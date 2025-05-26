import { IsInt, Min, IsString } from 'class-validator'

export class DebitWalletDto {
  @IsInt()
  @Min(1)
  amount!: number

  @IsString()
  description!: string
}
