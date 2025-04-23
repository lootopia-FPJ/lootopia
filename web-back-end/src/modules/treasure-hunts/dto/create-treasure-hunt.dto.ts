import { IsDate, IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator'
import { RewardType } from '../entities/treasure-hunt.entity'
import { Type } from 'class-transformer'

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
  @Type(() => Date)
  @IsDate({ message: 'ended_at must be a valid date' })
  ended_at?: Date

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

  @IsNotEmpty()
  @Min(0)
  @Max(1)
  difficulty!: number

  @IsOptional()
  is_draft: boolean = false

  @IsNotEmpty()
  created_by!: number
}
