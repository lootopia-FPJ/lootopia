import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { CacheService } from './cache.service'
import { CreateCacheDto } from './dto/create-cache.dto'

@Controller('caches')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  create(@Body() createCacheDto: CreateCacheDto) {
    return this.cacheService.create(createCacheDto)
  }

  @Get('hunt/:huntId')
  findAllByHunt(@Param('huntId', ParseIntPipe) huntId: number) {
    return this.cacheService.findAllByHuntId(huntId)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cacheService.delete(id)
  }
}
