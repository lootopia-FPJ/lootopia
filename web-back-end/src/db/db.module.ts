import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceConfig } from './data-source'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig)],
})
export class DbModule {}
