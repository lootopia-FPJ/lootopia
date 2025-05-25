import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { CreditWalletDto } from './dto/credit-wallet.dto'
import { DebitWalletDto } from './dto/debit-wallet.dto'
import { WalletService } from './wallet.service'

@Controller('wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async getBalance(@CurrentUser() user: { id: number }) {
    return this.walletService.getBalance(user.id)
  }

  @Post('credit')
  async credit(@CurrentUser() user: { id: number }, @Body() dto: CreditWalletDto) {
    return this.walletService.credit(user.id, dto.amount, dto.description)
  }

  @Post('debit')
  async debit(@CurrentUser() user: { id: number }, @Body() dto: DebitWalletDto) {
    return this.walletService.debit(user.id, dto.amount, dto.description)
  }
}
