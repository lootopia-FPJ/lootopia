import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserArtefactsService } from './user-artefacts.service'
import { CurrentUser } from '../../common/decorators/current-user.decorator'

@UseGuards(AuthGuard('jwt'))
@Controller('user-artefacts')
export class UserArtefactsController {
  constructor(private readonly userArtefactsService: UserArtefactsService) {}

  @Get('me')
  getMyArtefacts(@CurrentUser() user: { id: number }) {
    return this.userArtefactsService.findAllByUser(user.id)
  }
}
