import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OrderItemDomainModule } from '../domain'
import { OrderItemController } from './orderItem.controller'

import { OrderDomainModule } from '../../../modules/order/domain'

import { OrderItemByOrderController } from './orderItemByOrder.controller'

import { FoodItemDomainModule } from '../../../modules/foodItem/domain'

import { OrderItemByFoodItemController } from './orderItemByFoodItem.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    OrderItemDomainModule,

    OrderDomainModule,

    FoodItemDomainModule,
  ],
  controllers: [
    OrderItemController,

    OrderItemByOrderController,

    OrderItemByFoodItemController,
  ],
  providers: [],
})
export class OrderItemApplicationModule {}
