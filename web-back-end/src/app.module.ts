import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './config/database'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AuthModule],
})
export class AppModule {}
