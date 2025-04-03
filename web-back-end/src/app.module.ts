import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DbModule } from './db/db.module'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { TreasureHuntsModule } from './modules/treasure-hunts/treasure-hunts.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    TreasureHuntsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
