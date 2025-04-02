import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTreasureHuntDto } from './dto/create-treasure-hunt.dto'
import { UpdateTreasureHuntDto } from './dto/update-treasure-hunt.dto'
import { InjectRepository } from '@nestjs/typeorm'
import TreasureHunt from './entities/treasure-hunt.entity'
import { Repository } from 'typeorm'
import User from '../users/entities/user.entity'

@Injectable()
export class TreasureHuntsService {
  constructor(
    @InjectRepository(TreasureHunt)
    private readonly treasureHuntRepository: Repository<TreasureHunt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createTreasureHuntDto: CreateTreasureHuntDto) {
    const creator = await this.userRepository.findOneBy({ id: createTreasureHuntDto.created_by })
    if (!creator) {
      throw new BadRequestException('Creator of treasure hunt not found')
    }

    const treasureHunt = this.treasureHuntRepository.create({
      name: createTreasureHuntDto.name,
      description: createTreasureHuntDto.description,
      is_real_world: createTreasureHuntDto.is_real_world,
      is_public: createTreasureHuntDto.is_public,
      duration: createTreasureHuntDto.duration,
      max_players: createTreasureHuntDto.max_players,
      entry_fee: createTreasureHuntDto.entry_fee,
      reward_type: createTreasureHuntDto.reward_type,
      digging_delay: createTreasureHuntDto.digging_delay,
      digging_cost: createTreasureHuntDto.digging_cost,
      is_draft: createTreasureHuntDto.is_draft,
      created_by: creator,
    })

    return this.treasureHuntRepository.save(treasureHunt)
  }

  findAll() {
    return this.treasureHuntRepository.find({
      where: { is_draft: false },
      loadRelationIds: true,
    })
  }

  findOne(id: number) {
    return this.treasureHuntRepository.findOneBy({ id })
  }

  update(id: number, updateTreasureHuntDto: UpdateTreasureHuntDto) {
    return this.treasureHuntRepository.update(id, {
      name: updateTreasureHuntDto.name,
      description: updateTreasureHuntDto.description,
      is_real_world: updateTreasureHuntDto.is_real_world,
      is_public: updateTreasureHuntDto.is_public,
      duration: updateTreasureHuntDto.duration,
      max_players: updateTreasureHuntDto.max_players,
      entry_fee: updateTreasureHuntDto.entry_fee,
      reward_type: updateTreasureHuntDto.reward_type,
      digging_delay: updateTreasureHuntDto.digging_delay,
      digging_cost: updateTreasureHuntDto.digging_cost,
      is_draft: updateTreasureHuntDto.is_draft,
    })
  }

  remove(id: number) {
    return this.treasureHuntRepository.delete(id)
  }
}
