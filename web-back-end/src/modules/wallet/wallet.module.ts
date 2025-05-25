import { Module } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletController } from './wallet.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CrownTransaction } from './entities/crown-transaction.entity'
import { Wallet } from './entities/wallet.entity'
import User from '../users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, CrownTransaction, User])],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
