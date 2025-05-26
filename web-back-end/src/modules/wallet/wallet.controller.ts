import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreditWalletDto } from './dto/credit-wallet.dto'
import { DebitWalletDto } from './dto/debit-wallet.dto'
import { WalletService } from './wallet.service'
import { SelfOrAdminGuard } from 'src/common/guards/roles/self-or-admin.guard'
import { NotFoundInterceptorInterceptor } from 'src/common/interceptors/not-found-interceptor.interceptor'

@Controller('wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(SelfOrAdminGuard)
  @Get(':id')
  @UseInterceptors(NotFoundInterceptorInterceptor)
  async getBalance(@Param('id') id: string) {
    return this.walletService.getBalance(+id)
  }

  @UseGuards(SelfOrAdminGuard)
  @Post(':id/credit')
  async credit(@Param('id') id: string, @Body() dto: CreditWalletDto) {
    return this.walletService.credit(+id, dto.amount, dto.description)
  }

  @UseGuards(SelfOrAdminGuard)
  @Post(':id/debit')
  async debit(@Param('id') id: string, @Body() dto: DebitWalletDto) {
    return this.walletService.debit(+id, dto.amount, dto.description)
  }

  @UseGuards(SelfOrAdminGuard)
  @Get(':id/transactions')
  async getTransactions(@Param('id') id: string) {
    return this.walletService.getTransactions(+id)
  }
}
