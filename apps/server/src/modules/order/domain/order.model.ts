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

import { OrderItem } from '../../../modules/orderItem/domain'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  pickupTime: string

  @Column({})
  status: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.orders)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  outletId: string

  @ManyToOne(() => Outlet, parent => parent.orders)
  @JoinColumn({ name: 'outletId' })
  outlet?: Outlet

  @OneToMany(() => OrderItem, child => child.order)
  orderItems?: OrderItem[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
