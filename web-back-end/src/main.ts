import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { WinstonModule } from 'nest-winston'
import { customLogger } from './common/logger/app.logger'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: customLogger }),
  })
  app.use('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }))
  app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: [],
          },
        },
      })
  )
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })

  await app.listen(3000)
}

bootstrap()
