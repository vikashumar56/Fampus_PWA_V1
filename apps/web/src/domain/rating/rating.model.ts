import { User } from '../user'

import { Outlet } from '../outlet'

export class Rating {
  id: string

  score: number

  comment?: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  outletId: string

  outlet?: Outlet
}
