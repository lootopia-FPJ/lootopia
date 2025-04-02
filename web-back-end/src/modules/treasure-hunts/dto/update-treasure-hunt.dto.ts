import { PartialType } from '@nestjs/mapped-types'
import { CreateTreasureHuntDto } from './create-treasure-hunt.dto'

export class UpdateTreasureHuntDto extends PartialType(CreateTreasureHuntDto) {}
