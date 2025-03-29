import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DbModule } from './db/db.module'

@Module({
  imports: [DbModule, AuthModule, UsersModule],
})
export class AppModule {}
