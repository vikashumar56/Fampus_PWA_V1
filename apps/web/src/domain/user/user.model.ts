import { Notification } from '../notification'

import { Outlet } from '../outlet'

import { Order } from '../order'

import { Rating } from '../rating'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  sudo: boolean

  outletsAsOwner?: Outlet[]

  orders?: Order[]

  ratings?: Rating[]
}
