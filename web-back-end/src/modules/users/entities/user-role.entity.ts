import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User
}
