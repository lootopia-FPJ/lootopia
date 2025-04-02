import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DbModule } from './db/db.module'
import { TreasureHuntsModule } from './modules/treasure-hunts/treasure-hunts.module'

@Module({
  imports: [DbModule, AuthModule, UsersModule, TreasureHuntsModule],
})
export class AppModule {}
