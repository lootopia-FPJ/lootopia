import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import User from 'src/modules/users/entities/user.entity'

@Entity()
export class CrownTransaction {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column()
  type!: 'CREDIT' | 'DEBIT'

  @Column('int')
  amount!: number

  @Column()
  description!: string

  @CreateDateColumn({ name: 'transaction_date' })
  transactionDate!: Date

  @Column('int', { name: 'balance_after_transaction' })
  balanceAfterTransaction!: number
}
