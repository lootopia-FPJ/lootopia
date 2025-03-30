import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DbModule } from './db/db.module'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { TreasureHuntsModule } from './modules/treasure-hunts/treasure-hunts.module'

@Module({
  imports: [DbModule, AuthModule, UsersModule, TreasureHuntsModule],
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(60),
          limit: 5,
        },
      ],
    }),
  ],
})
export class AppModule {}
