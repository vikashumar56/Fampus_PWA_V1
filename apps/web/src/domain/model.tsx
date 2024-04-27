import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Outlet as OutletModel } from './outlet/outlet.model'

import { FoodItem as FoodItemModel } from './foodItem/foodItem.model'

import { Order as OrderModel } from './order/order.model'

import { OrderItem as OrderItemModel } from './orderItem/orderItem.model'

import { PreparationTime as PreparationTimeModel } from './preparationTime/preparationTime.model'

import { Rating as RatingModel } from './rating/rating.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Outlet extends OutletModel {}

  export class FoodItem extends FoodItemModel {}

  export class Order extends OrderModel {}

  export class OrderItem extends OrderItemModel {}

  export class PreparationTime extends PreparationTimeModel {}

  export class Rating extends RatingModel {}
}
