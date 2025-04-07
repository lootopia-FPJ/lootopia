import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Cache from './entities/cache.entity'
import TreasureHunt from '../treasure-hunts/entities/treasure-hunt.entity'
import { CacheService } from './cache.service'
import { CacheController } from './cache.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Cache, TreasureHunt])],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
