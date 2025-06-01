import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Stage from './entities/stage.entity'
import User from '../users/entities/user.entity'
import { StageValidation } from './entities/stage-validation.entity'
import { CreateStageDto } from './dto/create-stage.dto'
import TreasureHunt from '../treasure-hunts/entities/treasure-hunt.entity'

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepo: Repository<Stage>,

    @InjectRepository(StageValidation)
    private readonly validationRepo: Repository<StageValidation>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(TreasureHunt)
    private readonly treasureHuntRepository: Repository<TreasureHunt>
  ) {}

  async validateStageByAR(stageId: number, userId: number): Promise<any> {
    const stage = await this.stageRepo.findOne({
      where: { id: stageId },
    })
    if (!stage) throw new NotFoundException('Stage not found')

    const user = await this.userRepo.findOneBy({ id: userId })
    if (!user) throw new NotFoundException('User not found')

    const existing = await this.validationRepo.findOne({
      where: {
        stage: { id: stageId },
        user: { id: userId },
      },
    })

    if (existing) throw new BadRequestException('Stage already validated by this user')

    const validation = this.validationRepo.create({
      user,
      stage,
      method: 'AR',
    })

    await this.validationRepo.save(validation)

    return {
      success: true,
      message: 'Stage successfully validated using AR',
      reward: {
        crowns: 5,
      },
      animation: 'chest_open',
    }
  }

  async createStage(dto: CreateStageDto, user: User): Promise<Stage> {
    const treasureHunt = await this.treasureHuntRepository.findOneBy({ id: dto.treasureHuntId })
    if (!treasureHunt) throw new NotFoundException('Treasure Hunt not found')

    const stage = this.stageRepo.create({
      name: dto.name,
      description: dto.description,
      treasureHunt,
      creator: user,
    })

    return await this.stageRepo.save(stage)
  }
}
