import { IsEnum } from 'class-validator'

export class ValidateStageDto {
  @IsEnum(['AR', 'Manual', 'GPS'])
  method!: 'AR' | 'Manual' | 'GPS'
}
