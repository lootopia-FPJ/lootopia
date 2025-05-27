import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtefactsService } from './artefacts.service'
import { ArtefactsController } from './artefacts.controller'
import { Artefact } from './entities/artefact.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Artefact])],
  controllers: [ArtefactsController],
  providers: [ArtefactsService],
  exports: [ArtefactsService],
})
export class ArtefactsModule {}
