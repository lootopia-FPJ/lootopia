import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common'
import { TreasureHuntsService } from './treasure-hunts.service'
import { CreateTreasureHuntDto } from './dto/create-treasure-hunt.dto'
import { UpdateTreasureHuntDto } from './dto/update-treasure-hunt.dto'
import { NotFoundInterceptorInterceptor } from '../../common/interceptors/not-found-interceptor.interceptor'
import { AuthGuard } from '@nestjs/passport'
import { SelfOrAdminGuard } from '../../common/guards/roles/self-or-admin.guard'

@UseGuards(AuthGuard('jwt'))
@Controller('treasure-hunts')
export class TreasureHuntsController {
  constructor(private readonly treasureHuntsService: TreasureHuntsService) {}

  @Post()
  create(@Body() createTreasureHuntDto: CreateTreasureHuntDto) {
    return this.treasureHuntsService.create(createTreasureHuntDto)
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.treasureHuntsService.findAllPaginated(+page, +limit)
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptorInterceptor)
  findOne(@Param('id') id: string) {
    return this.treasureHuntsService.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreasureHuntDto: UpdateTreasureHuntDto) {
    return this.treasureHuntsService.update(+id, updateTreasureHuntDto)
  }
  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treasureHuntsService.remove(+id)
  }

  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.treasureHuntsService.findByUser(+id)
  }
}
