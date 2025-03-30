import { Module } from '@nestjs/common'
import { TreasureHuntsService } from './treasure-hunts.service'
import { TreasureHuntsController } from './treasure-hunts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import TreasureHunt from './entities/treasure-hunt.entity'
import User from '../users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TreasureHunt, User])],
  controllers: [TreasureHuntsController],
  providers: [TreasureHuntsService],
})
export class TreasureHuntsModule {}
