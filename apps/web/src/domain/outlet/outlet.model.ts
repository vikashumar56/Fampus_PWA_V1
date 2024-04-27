import { User } from '../user'

import { FoodItem } from '../foodItem'

import { Order } from '../order'

import { PreparationTime } from '../preparationTime'

import { Rating } from '../rating'

export class Outlet {
  id: string

  name: string

  address: string

  orderDelayTimer: number

  paymentQrCode?: string

  profilePhotoUrl?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  ownerId: string

  owner?: User

  foodItems?: FoodItem[]

  orders?: Order[]

  preparationTimes?: PreparationTime[]

  ratings?: Rating[]
}
