import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('user_consent')
export class UserConsent {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  privacy_policy_version!: string

  @CreateDateColumn({ type: 'timestamp' })
  consent_date!: Date

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User
}
