import { Outlet } from '../outlet'

import { OrderItem } from '../orderItem'

import { PreparationTime } from '../preparationTime'

export class FoodItem {
  id: string

  name: string

  description?: string

  price: number

  isAvailable: boolean

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  outletId: string

  outlet?: Outlet

  orderItems?: OrderItem[]

  preparationTimes?: PreparationTime[]
}
