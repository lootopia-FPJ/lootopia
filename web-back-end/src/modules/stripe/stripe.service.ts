/* eslint-disable security/detect-object-injection */
import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

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

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
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
}
