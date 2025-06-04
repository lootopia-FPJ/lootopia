import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { CacheService } from './cache.service'
import { CreateCacheDto } from './dto/create-cache.dto'
import { UpdateCacheDto } from './dto/update-cache.dto'
import { AuthGuard } from '@nestjs/passport'
@UseGuards(AuthGuard('jwt'))
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

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCacheDto: UpdateCacheDto) {
    return this.cacheService.update(id, updateCacheDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cacheService.delete(id)
  }
}
