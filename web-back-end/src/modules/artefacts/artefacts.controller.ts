import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common'
import { ArtefactsService } from './artefacts.service'
import { CreateArtefactDto } from './dto/create-artefact.dto'
import { UpdateArtefactDto } from './dto/update-artefact.dto'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../../common/guards/roles/roles.guard'
import { NotFoundInterceptorInterceptor } from '../../common/interceptors/not-found-interceptor.interceptor'
import { UseInterceptors } from '@nestjs/common'
import { Role } from 'src/common/decorators/role.decorator'

@Controller('artefacts')
export class ArtefactsController {
  constructor(private readonly artefactsService: ArtefactsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('ADMIN')
  @Post()
  create(@Body() dto: CreateArtefactDto) {
    return this.artefactsService.create(dto)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('ADMIN')
  @Get()
  findAll() {
    return this.artefactsService.findAll()
  }

  @Get('shop')
  findAvailableInShop() {
    return this.artefactsService.findAvailableInShop()
  }

  @UseInterceptors(NotFoundInterceptorInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.artefactsService.findOne(id)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('ADMIN')
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateArtefactDto) {
    return this.artefactsService.update(id, dto)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.artefactsService.remove(id)
  }
}
