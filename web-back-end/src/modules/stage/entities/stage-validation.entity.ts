import User from 'src/modules/users/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Stage from './stage.entity'

@Entity()
export class StageValidation {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Stage)
  stage!: Stage

  @Column({
    type: 'enum',
    enum: ['AR', 'Manual', 'GPS'],
    default: 'AR',
  })
  method!: 'AR' | 'Manual' | 'GPS'

  @CreateDateColumn()
  validatedAt!: Date
}
