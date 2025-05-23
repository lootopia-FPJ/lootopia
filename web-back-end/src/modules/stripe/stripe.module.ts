import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      imports: [ConfigModule],
      controllers: [StripeController],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (config: ConfigService) => config.get<string>('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
      ],
      exports: [StripeService],
    }
  }
}
