import { Outlet } from '../outlet'

import { FoodItem } from '../foodItem'

export class PreparationTime {
  id: string

  timeRequired: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  outletId: string

  outlet?: Outlet

  foodItemId: string

  foodItem?: FoodItem
}
