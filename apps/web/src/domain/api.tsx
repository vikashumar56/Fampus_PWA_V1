import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { OutletApi } from './outlet/outlet.api'

import { FoodItemApi } from './foodItem/foodItem.api'

import { OrderApi } from './order/order.api'

import { OrderItemApi } from './orderItem/orderItem.api'

import { PreparationTimeApi } from './preparationTime/preparationTime.api'

import { RatingApi } from './rating/rating.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Outlet extends OutletApi {}

  export class FoodItem extends FoodItemApi {}

  export class Order extends OrderApi {}

  export class OrderItem extends OrderItemApi {}

  export class PreparationTime extends PreparationTimeApi {}

  export class Rating extends RatingApi {}
}
