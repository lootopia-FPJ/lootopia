import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Cache from './entities/cache.entity'
import { CreateCacheDto } from './dto/create-cache.dto'
import TreasureHunt from '../treasure-hunts/entities/treasure-hunt.entity'

@Injectable()
export class CacheService {
  constructor(
    @InjectRepository(Cache)
    private cacheRepository: Repository<Cache>
  ) {}

  async create(dto: CreateCacheDto) {
    const { treasure_hunt_id, ...rest } = dto

    const cache = this.cacheRepository.create({
      ...rest,
      treasure_hunt: { id: treasure_hunt_id } as TreasureHunt,
    })

    return this.cacheRepository.save(cache)
  }

  async findAllByHuntId(huntId: number) {
    return this.cacheRepository.find({ where: { treasure_hunt: { id: huntId } } })
  }

  async delete(id: number) {
    const result = await this.cacheRepository.delete(id)
    if (result.affected === 0) throw new NotFoundException('Cache not found')
    return { deleted: true }
  }
}
