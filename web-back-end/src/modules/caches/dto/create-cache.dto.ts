import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { WorldType } from '../entities/cache.entity'

export class CreateCacheDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsEnum(WorldType)
  world_type!: WorldType

  @IsNotEmpty()
  @IsNumber()
  latitude!: number

  @IsNotEmpty()
  @IsNumber()
  longitude!: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  size?: number = 80

  @IsOptional()
  @IsBoolean()
  is_visible?: boolean = false

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  precision_radius?: number = 10

  @IsOptional()
  @IsNumber()
  contains_crowns?: number = 0

  @IsOptional()
  @IsNumber()
  contains_artifact?: number

  @IsOptional()
  @IsBoolean()
  digging_enabled?: boolean = true

  @IsOptional()
  @IsString()
  digging_delay?: string = '1 minute'

  @IsOptional()
  @IsNumber()
  digging_cost?: number = 0

  @IsNotEmpty()
  treasure_hunt_id!: number
}
