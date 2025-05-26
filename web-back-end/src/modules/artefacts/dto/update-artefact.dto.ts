import { PartialType } from '@nestjs/mapped-types'
import { CreateArtefactDto } from './create-artefact.dto'

export class UpdateArtefactDto extends PartialType(CreateArtefactDto) {}
