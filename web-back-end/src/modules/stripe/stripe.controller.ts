import { Body, Controller, Get, Post, UseGuards, BadRequestException } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'

type CrownPackId = 'pack_10' | 'pack_25' | 'pack_50' | 'pack_100'

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('test')
  async testConnection() {
    return this.stripeService.testStripeConnection()
  }

  @Post('checkout-session')
  @UseGuards(AuthGuard('jwt'))
  async createSession(@CurrentUser() user: { id: string }, @Body() body: { packId: string }) {
    const validPackIds: CrownPackId[] = ['pack_10', 'pack_25', 'pack_50', 'pack_100']
    if (!validPackIds.includes(body.packId as CrownPackId)) {
      throw new BadRequestException('Invalid packId')
    }

    const url = await this.stripeService.createCheckoutSession(
      Number(user.id),
      body.packId as CrownPackId
    )

    return { url }
  }
}
