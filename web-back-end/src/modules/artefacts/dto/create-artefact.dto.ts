import { IsString, IsOptional, IsEnum, IsBoolean, IsInt } from 'class-validator'
import { Rarity } from '../entities/artefact.entity'

export class CreateArtefactDto {
  @IsString()
  name!: string

  @IsEnum(Rarity)
  rarity!: Rarity

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  imageUrl?: string

  @IsOptional()
  @IsString()
  effect?: string

  @IsBoolean()
  tradable!: boolean

  @IsInt()
  price!: number
}
