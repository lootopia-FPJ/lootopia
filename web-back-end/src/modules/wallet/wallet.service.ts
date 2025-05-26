import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Wallet } from './entities/wallet.entity'
import { CrownTransaction } from './entities/crown-transaction.entity'
import User from '../users/entities/user.entity'

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
    @InjectRepository(CrownTransaction) private txRepo: Repository<CrownTransaction>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async getBalance(userId: number): Promise<number> {
    const wallet = await this.findOrCreateWallet(userId)
    return wallet.balance
  }

  async getTransactions(userId: number): Promise<CrownTransaction[]> {
    return this.txRepo.find({
      where: { user: { id: userId } },
      order: { transactionDate: 'DESC' },
    })
  }

  async credit(userId: number, amount: number, description: string) {
    const wallet = await this.findOrCreateWallet(userId)

    wallet.balance += amount
    await this.walletRepo.save(wallet)

    const user = await this.userRepo.findOneBy({ id: userId })

    await this.txRepo.save({
      user: user!,
      type: 'CREDIT',
      amount,
      description,
      balanceAfterTransaction: wallet.balance,
    })

    return { balance: wallet.balance }
  }

  async debit(userId: number, amount: number, description: string) {
    const wallet = await this.findOrCreateWallet(userId)

    if (wallet.balance < amount) {
      throw new BadRequestException('Solde insuffisant')
    }

    wallet.balance -= amount
    await this.walletRepo.save(wallet)

    const user = await this.userRepo.findOneBy({ id: userId })

    await this.txRepo.save({
      user: user!,
      type: 'DEBIT',
      amount,
      description,
      balanceAfterTransaction: wallet.balance,
    })

    return { balance: wallet.balance }
  }

  private async findOrCreateWallet(userId: number): Promise<Wallet> {
    let wallet = await this.walletRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    })

    if (!wallet) {
      const user = await this.userRepo.findOneBy({ id: userId })
      wallet = this.walletRepo.create({
        user: user!,
        balance: 0,
      })
      await this.walletRepo.save(wallet)
    }

    return wallet
  }
}
