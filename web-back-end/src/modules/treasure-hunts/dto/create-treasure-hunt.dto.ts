import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { RewardType } from '../entities/treasure-hunt.entity'

export class CreateTreasureHuntDto {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  description!: string

  @IsNotEmpty()
  is_real_world!: boolean

  @IsNotEmpty()
  is_public!: boolean

  @IsOptional()
  duration?: number

  @IsOptional()
  max_players?: number

  @IsOptional()
  entry_fee?: number

  @IsNotEmpty()
  @IsEnum(RewardType)
  reward_type!: string

  @IsNotEmpty()
  digging_delay!: number

  @IsNotEmpty()
  digging_cost!: number

  @IsOptional()
  is_draft: boolean = false

  @IsNotEmpty()
  created_by!: number
}
