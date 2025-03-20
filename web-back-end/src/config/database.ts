import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../modules/users/entities/user.entity'
import { UserConsent } from '../modules/users/entities/user-consent.entity'
import { UserRole } from '../modules/users/entities/user-role.entity'
import * as dotenv from 'dotenv'

dotenv.config()

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  entities: [User, UserConsent, UserRole],
  synchronize: true,
}
