import TreasureHunt from 'src/modules/treasure-hunts/entities/treasure-hunt.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'

export enum WorldType {
  REAL = 'Monde Réel',
  MAP = 'Monde Cartographique',
}

@Entity()
export default class Cache {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => TreasureHunt, (hunt) => hunt.caches, { onDelete: 'CASCADE' })
  treasure_hunt!: TreasureHunt

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'text', nullable: true })
  description!: string

  @Column({ type: 'varchar', length: 50 })
  world_type!: WorldType

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude!: number

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude!: number

  @Column({ type: 'int', default: 80 })
  size!: number

  @Column({ default: false })
  is_visible!: boolean

  @Column({ type: 'int', default: 10 })
  precision_radius!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  contains_crowns!: number

  @Column({ nullable: true })
  contains_artifact!: number

  @Column({ default: true })
  digging_enabled!: boolean

  @Column({ type: 'interval', default: () => `'1 minute'` })
  digging_delay!: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  digging_cost!: number

  @CreateDateColumn()
  created_at!: Date
}
