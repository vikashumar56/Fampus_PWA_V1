import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Outlet } from '../../../modules/outlet/domain'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  score: number

  @Column({ nullable: true })
  comment?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.ratings)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  outletId: string

  @ManyToOne(() => Outlet, parent => parent.ratings)
  @JoinColumn({ name: 'outletId' })
  outlet?: Outlet

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
