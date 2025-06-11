/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm'
import User from '../../users/entities/user.entity' // ✅ import default
import { Artefact } from '../../artefacts/entities/artefact.entity'

@Entity('user_artefact')
@Unique(['user', 'artefact'])
export class UserArtefact {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.userArtefacts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Artefact, (artefact) => artefact.userArtefacts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artefact_id' })
  artefact!: Artefact

  @Column({ type: 'int', default: 1 })
  quantity!: number
}
