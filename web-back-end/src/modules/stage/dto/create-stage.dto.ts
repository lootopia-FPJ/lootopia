import { IsString, IsNotEmpty, IsInt } from 'class-validator'

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsInt()
  treasureHuntId!: number
}
