import { Module } from '@nestjs/common'
import { StageController } from './stage.controller'
import { StageService } from './stage.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import Stage from './entities/stage.entity'
import { StageValidation } from './entities/stage-validation.entity'
import User from '../users/entities/user.entity'
import TreasureHunt from '../treasure-hunts/entities/treasure-hunt.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Stage, StageValidation, User, TreasureHunt])],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
