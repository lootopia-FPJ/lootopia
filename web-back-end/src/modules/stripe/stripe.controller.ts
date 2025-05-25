import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  BadRequestException,
  Req,
  Res,
  Headers,
} from '@nestjs/common'
import { StripeService } from './stripe.service'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Request, Response } from 'express'

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
  async createSession(@CurrentUser() user: { id: string }, @Body() body: { packId: CrownPackId }) {
    const validPackIds: CrownPackId[] = ['pack_10', 'pack_25', 'pack_50', 'pack_100']
    if (!validPackIds.includes(body.packId)) {
      throw new BadRequestException('Invalid packId')
    }

    const url = await this.stripeService.createCheckoutSession(Number(user.id), body.packId)
    return { url }
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string
  ) {
    const result = await this.stripeService.handleWebhook(req.body, signature)

    if (result.success) {
      return res.status(200).json({ received: true })
    }

    return res.status(400).send(`Webhook Error: ${result.message}`)
  }
}
