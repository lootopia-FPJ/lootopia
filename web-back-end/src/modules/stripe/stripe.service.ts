import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private stripe: Stripe

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
}
