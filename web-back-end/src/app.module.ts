import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { DbModule } from './db/db.module'
import { seconds, ThrottlerModule } from '@nestjs/throttler'
import { TreasureHuntsModule } from './modules/treasure-hunts/treasure-hunts.module'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from './modules/caches/cache.module'
import { CloudinaryModule } from './common/cloudinary/cloudinary.module'
import { StripeModule } from './modules/stripe/stripe.module'
import { WalletModule } from './modules/wallet/wallet.module'
import { LoggerModule } from './common/logger/logger.module'
import { ArtefactsModule } from './modules/artefacts/artefacts.module'
import { UserArtefactsModule } from './modules/user-artefacts/user-artefacts.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    TreasureHuntsModule,
    CacheModule,
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
    CloudinaryModule,
    StripeModule.forRootAsync(),
    WalletModule,
    LoggerModule,
    ArtefactsModule,
    UserArtefactsModule,
  ],
})
export class AppModule {}
