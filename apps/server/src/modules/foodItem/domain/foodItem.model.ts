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

import { Outlet } from '../../../modules/outlet/domain'

import { OrderItem } from '../../../modules/orderItem/domain'

import { PreparationTime } from '../../../modules/preparationTime/domain'

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @ColumnNumeric({ type: 'numeric' })
  price: number

  @Column({ default: true })
  isAvailable: boolean

  @Column({})
  outletId: string

  @ManyToOne(() => Outlet, parent => parent.foodItems)
  @JoinColumn({ name: 'outletId' })
  outlet?: Outlet

  @OneToMany(() => OrderItem, child => child.foodItem)
  orderItems?: OrderItem[]

  @OneToMany(() => PreparationTime, child => child.foodItem)
  preparationTimes?: PreparationTime[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
