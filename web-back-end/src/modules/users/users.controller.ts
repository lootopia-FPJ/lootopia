import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundInterceptorInterceptor } from '../../common/interceptors/not-found-interceptor.interceptor'
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ChangePasswordDto } from './dto/change-password.dto'
import { Role } from '../../common/decorators/role.decorator'
import { RolesGuard } from '../../common/guards/roles/roles.guard'
import { SelfOrAdminGuard } from '../../common/guards/roles/self-or-admin.guard'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Role('ADMIN')
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Get(':id')
  @UseInterceptors(NotFoundInterceptorInterceptor)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile_picture'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer['File']
  ) {
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file)
      updateUserDto.profile_picture = result.secure_url
    }

    return this.usersService.update(+id, updateUserDto)
  }

  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
  @UseGuards(AuthGuard('jwt'), SelfOrAdminGuard)
  @Patch(':id/password')
  async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(+id, changePasswordDto.newPassword)
  }
}
