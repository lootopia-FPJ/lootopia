// src/common/logger/logger.module.ts
import { Global, Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { customLogger } from './app.logger' 

@Global()
@Module({
  imports: [WinstonModule.forRoot(customLogger)],
  exports: [WinstonModule],
})
export class LoggerModule {}
