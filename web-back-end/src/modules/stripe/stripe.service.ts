/* eslint-disable complexity */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable security/detect-object-injection */
import { Inject, Injectable, LoggerService } from '@nestjs/common'
import Stripe from 'stripe'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { WalletService } from '../wallet/wallet.service'

@Injectable()
export class StripeService {
  private stripe: Stripe

  private crownPacks: Record<
    'pack_10' | 'pack_25' | 'pack_50' | 'pack_100',
    { crowns: number; price: number }
  > = {
    pack_10: { crowns: 10, price: 199 },
    pack_25: { crowns: 25, price: 499 },
    pack_50: { crowns: 50, price: 899 },
    pack_100: { crowns: 100, price: 1699 },
  }

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private readonly walletService: WalletService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-04-30.basil',
    })
  }

  getStripeInstance(): Stripe {
    return this.stripe
  }

  async testStripeConnection(): Promise<any> {
    return await this.stripe.products.list({ limit: 1 })
  }

  async createCheckoutSession(
    userId: number,
    packId: 'pack_10' | 'pack_25' | 'pack_50' | 'pack_100'
  ): Promise<string> {
    const pack = this.crownPacks[packId]
    if (!pack) throw new Error('Pack not found')

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${pack.crowns} Crowns`,
              description: `Buy pack ${pack.crowns} Crowns`,
            },
            unit_amount: pack.price,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: {
        userId: userId.toString(),
        crowns: pack.crowns.toString(),
      },
    })

    if (!session.url) {
      throw new Error('Session URL is null')
    }
    return session.url
  }

  async handleWebhook(
    body: any,
    signature: string
  ): Promise<{ success: boolean; message?: string }> {
    this.logger.log('📩 Webhook reçu !')

    let event: Stripe.Event
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
      this.logger.log('✅ Stripe  signature verified')
    } catch (err: any) {
      this.logger.error('❌ Invalid signature :', err.message)
      return { success: false, message: `Signature error: ${err.message}` }
    }

    this.logger.log('📦 Stripe event:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = parseInt(session.metadata?.userId || '0')
      const crowns = parseInt(session.metadata?.crowns || '0')

      this.logger.log(`💰 Credit of ${crowns} Crowns to user ${userId}`)

      if (userId && crowns > 0) {
        await this.walletService.credit(userId, crowns, 'Achat via Stripe')
        return { success: true }
      }
    }

    return { success: false, message: 'Unhandled event or missing metadata' }
  }
}
