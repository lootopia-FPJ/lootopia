import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from '../../users/entities/user.entity'

export enum RewardType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity()
export default class TreasureHunt {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  is_real_world!: boolean

  @Column()
  is_public!: boolean

  @Column({ nullable: true })
  duration?: number

  @Column({ nullable: true })
  max_players!: number

  @Column({ nullable: true })
  entry_fee?: number

  @Column({ enum: RewardType })
  reward_type?: string

  @Column({ comment: 'in seconds', default: 1 })
  digging_delay!: number

  @Column({ default: 1 })
  digging_cost!: number

  @Column({ default: false })
  is_draft!: boolean

  @Column()
  difficulty!: number

  @ManyToOne(() => User)
  created_by!: User

  @ManyToMany(() => User)
  @JoinTable({
    name: 'treasure_hunt_participants_user',
    joinColumn: { name: 'treasure_hunt_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  participants!: User[]

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}
