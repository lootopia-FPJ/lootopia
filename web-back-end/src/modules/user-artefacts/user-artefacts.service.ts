import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserArtefact } from './entities/user-artefact.entity'
import { CreateUserArtefactDto } from './dto/create-user-artefact.dto'
import User from '../users/entities/user.entity'
import { Artefact } from '../artefacts/entities/artefact.entity'

@Injectable()
export class UserArtefactsService {
  constructor(
    @InjectRepository(UserArtefact)
    private userArtefactRepo: Repository<UserArtefact>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Artefact)
    private artefactRepo: Repository<Artefact>
  ) {}

  async addArtefact(dto: CreateUserArtefactDto): Promise<UserArtefact> {
    const user = await this.userRepo.findOneByOrFail({ id: dto.userId })
    const artefact = await this.artefactRepo.findOneByOrFail({ id: dto.artefactId })

    let userArtefact = await this.userArtefactRepo.findOne({ where: { user, artefact } })

    if (userArtefact) {
      userArtefact.quantity += dto.quantity || 1
    } else {
      userArtefact = this.userArtefactRepo.create({ user, artefact, quantity: dto.quantity || 1 })
    }

    return this.userArtefactRepo.save(userArtefact)
  }

  async findAllByUser(userId: number): Promise<UserArtefact[]> {
    return this.userArtefactRepo.find({ where: { user: { id: userId } } })
  }
}
