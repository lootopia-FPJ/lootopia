import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserArtefactsService } from './user-artefacts.service'
import { UserArtefactsController } from './user-artefacts.controller'
import { UserArtefact } from './entities/user-artefact.entity'
import { Artefact } from '../artefacts/entities/artefact.entity'
import User from '../users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserArtefact, Artefact, User])],
  controllers: [UserArtefactsController],
  providers: [UserArtefactsService],
  exports: [UserArtefactsService],
})
export class UserArtefactsModule {}
