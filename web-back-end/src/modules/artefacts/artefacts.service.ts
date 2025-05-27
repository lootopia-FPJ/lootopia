import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'
import { Artefact } from './entities/artefact.entity'
import { CreateArtefactDto } from './dto/create-artefact.dto'
import { UpdateArtefactDto } from './dto/update-artefact.dto'

@Injectable()
export class ArtefactsService {
  constructor(
    @InjectRepository(Artefact)
    private readonly artefactRepo: Repository<Artefact>
  ) {}

  create(dto: CreateArtefactDto) {
    const artefact = this.artefactRepo.create(dto)
    return this.artefactRepo.save(artefact)
  }

  findAll() {
    return this.artefactRepo.find()
  }

  findOne(id: number) {
    return this.artefactRepo.findOneByOrFail({ id })
  }

  async update(id: number, dto: UpdateArtefactDto) {
    const artefact = await this.artefactRepo.findOneBy({ id })
    if (!artefact) throw new NotFoundException('Artefact not found')
    Object.assign(artefact, dto)
    return this.artefactRepo.save(artefact)
  }

  async remove(id: number) {
    const artefact = await this.artefactRepo.findOneBy({ id })
    if (!artefact) throw new NotFoundException('Artefact not found')
    return this.artefactRepo.remove(artefact)
  }

  findAvailableInShop() {
    return this.artefactRepo.find({
      where: {
        price: MoreThan(0),
      },
    })
  }
}
