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

import { Order } from '../../../modules/order/domain'

import { FoodItem } from '../../../modules/foodItem/domain'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  quantity: number

  @Column({})
  orderId: string

  @ManyToOne(() => Order, parent => parent.orderItems)
  @JoinColumn({ name: 'orderId' })
  order?: Order

  @Column({})
  foodItemId: string

  @ManyToOne(() => FoodItem, parent => parent.orderItems)
  @JoinColumn({ name: 'foodItemId' })
  foodItem?: FoodItem

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
