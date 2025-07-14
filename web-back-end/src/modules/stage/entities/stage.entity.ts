import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { StageValidation } from './stage-validation.entity'
import TreasureHunt from '../../treasure-hunts/entities/treasure-hunt.entity'
import User from 'src/modules/users/entities/user.entity'

@Entity()
export default class Stage {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column({ type: 'double precision', nullable: true })
  latitude?: number

  @Column({ type: 'double precision', nullable: true })
  longitude?: number

  @ManyToOne(() => TreasureHunt, (treasureHunt) => treasureHunt.stages, { onDelete: 'CASCADE' })
  treasureHunt!: TreasureHunt

  @OneToMany(() => StageValidation, (validation) => validation.stage)
  validations!: StageValidation[]

  @ManyToOne(() => User)
  creator!: User
}
