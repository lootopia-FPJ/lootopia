import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Role } from './role.entity'

export enum UserType {
  COMMUN = 'COMMUN',
  PARTENAIRE = 'PARTENAIRE',
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column({ type: 'varchar', length: 255, select: false })
  password_hash!: string

  @Column({ nullable: true })
  nickname?: string

  @Column({ default: false })
  is_mfa_enabled!: boolean

  @Column({ nullable: true })
  phone_number?: string

  @Column({ nullable: true })
  opt_secret?: string

  @Column({ nullable: true })
  profile_picture?: string

  @Column({ type: 'enum', enum: UserType, default: UserType.COMMUN })
  type!: UserType

  @Column({ default: false })
  is_active!: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[]
}
