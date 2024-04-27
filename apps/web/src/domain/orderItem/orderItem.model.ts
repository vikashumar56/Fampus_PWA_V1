import { Order } from '../order'

import { FoodItem } from '../foodItem'

export class OrderItem {
  id: string

  quantity: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  orderId: string

  order?: Order

  foodItemId: string

  foodItem?: FoodItem
}
