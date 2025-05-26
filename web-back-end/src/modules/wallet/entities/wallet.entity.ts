import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from 'src/modules/users/entities/user.entity'

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column('int', { default: 0 })
  balance!: number

  @UpdateDateColumn()
  updated_at!: Date
}
