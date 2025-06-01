import { Controller, Patch, Param, UseGuards, ParseIntPipe, Post, Body } from '@nestjs/common'
import { StageService } from './stage.service'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import User from '../users/entities/user.entity'
import { CreateStageDto } from './dto/create-stage.dto'

@UseGuards(AuthGuard('jwt'))
@Controller('stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  async createStage(@Body() dto: CreateStageDto, @CurrentUser() user: User) {
    return this.stageService.createStage(dto, user)
  }

  @Patch(':id/validate/ar')
  async validateByAR(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.stageService.validateStageByAR(id, user.id)
  }
}
