import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum Rarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@Entity('artefacts')
export class Artefact {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ type: 'enum', enum: Rarity })
  rarity!: Rarity

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl?: string

  @Column({ nullable: true })
  effect?: string

  @Column({ default: false })
  tradable!: boolean

  @Column({ default: 0 })
  price!: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date
}
