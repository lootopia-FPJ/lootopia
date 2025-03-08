import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { IsEmail, Matches, MinLength } from 'class-validator'

export enum UserType {
  COMMUN = 'COMMUN',
  PARTENAIRE = 'PARTENAIRE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string

  @Column()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
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

  @BeforeInsert()
  async hashPassword() {
    this.password_hash = await bcrypt.hash(this.password_hash, 10)
  }
}
