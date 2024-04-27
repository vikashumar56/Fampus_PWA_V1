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

import { FoodItem } from '../../../modules/foodItem/domain'

@Entity()
export class PreparationTime {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  timeRequired: number

  @Column({})
  outletId: string

  @ManyToOne(() => Outlet, parent => parent.preparationTimes)
  @JoinColumn({ name: 'outletId' })
  outlet?: Outlet

  @Column({})
  foodItemId: string

  @ManyToOne(() => FoodItem, parent => parent.preparationTimes)
  @JoinColumn({ name: 'foodItemId' })
  foodItem?: FoodItem

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
