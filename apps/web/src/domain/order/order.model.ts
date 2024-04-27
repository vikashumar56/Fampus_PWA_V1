import { User } from '../user'

import { Outlet } from '../outlet'

import { OrderItem } from '../orderItem'

export class Order {
  id: string

  pickupTime: string

  status: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId: string

  user?: User

  outletId: string

  outlet?: Outlet

  orderItems?: OrderItem[]
}
