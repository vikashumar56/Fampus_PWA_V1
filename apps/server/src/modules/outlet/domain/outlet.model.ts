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

import { FoodItem } from '../../../modules/foodItem/domain'

import { Order } from '../../../modules/order/domain'

import { PreparationTime } from '../../../modules/preparationTime/domain'

import { Rating } from '../../../modules/rating/domain'

@Entity()
export class Outlet {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  address: string

  @ColumnNumeric({ default: 0, type: 'numeric' })
  orderDelayTimer: number

  @Column({ nullable: true })
  paymentQrCode?: string

  @Column({ nullable: true })
  profilePhotoUrl?: string

  @Column({})
  ownerId: string

  @ManyToOne(() => User, parent => parent.outletsAsOwner)
  @JoinColumn({ name: 'ownerId' })
  owner?: User

  @OneToMany(() => FoodItem, child => child.outlet)
  foodItems?: FoodItem[]

  @OneToMany(() => Order, child => child.outlet)
  orders?: Order[]

  @OneToMany(() => PreparationTime, child => child.outlet)
  preparationTimes?: PreparationTime[]

  @OneToMany(() => Rating, child => child.outlet)
  ratings?: Rating[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
