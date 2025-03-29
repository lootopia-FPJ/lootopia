import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum RoleName {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'enum', enum: RoleName })
  name!: RoleName
}
