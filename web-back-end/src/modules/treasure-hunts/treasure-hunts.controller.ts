import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common'
import { TreasureHuntsService } from './treasure-hunts.service'
import { CreateTreasureHuntDto } from './dto/create-treasure-hunt.dto'
import { UpdateTreasureHuntDto } from './dto/update-treasure-hunt.dto'
import { NotFoundInterceptorInterceptor } from '../../common/interceptors/not-found-interceptor.interceptor'

@Controller('treasure-hunts')
export class TreasureHuntsController {
  constructor(private readonly treasureHuntsService: TreasureHuntsService) {}

  @Post()
  create(@Body() createTreasureHuntDto: CreateTreasureHuntDto) {
    return this.treasureHuntsService.create(createTreasureHuntDto)
  }

  @Get()
  findAll() {
    return this.treasureHuntsService.findAll()
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptorInterceptor)
  findOne(@Param('id') id: string) {
    return this.treasureHuntsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreasureHuntDto: UpdateTreasureHuntDto) {
    return this.treasureHuntsService.update(+id, updateTreasureHuntDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treasureHuntsService.remove(+id)
  }
}
