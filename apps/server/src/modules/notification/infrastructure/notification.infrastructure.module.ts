import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationOutletSubscriber } from './subscribers/notification.outlet.subscriber'

import { NotificationFoodItemSubscriber } from './subscribers/notification.foodItem.subscriber'

import { NotificationOrderSubscriber } from './subscribers/notification.order.subscriber'

import { NotificationOrderItemSubscriber } from './subscribers/notification.orderItem.subscriber'

import { NotificationPreparationTimeSubscriber } from './subscribers/notification.preparationTime.subscriber'

import { NotificationRatingSubscriber } from './subscribers/notification.rating.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationOutletSubscriber,

    NotificationFoodItemSubscriber,

    NotificationOrderSubscriber,

    NotificationOrderItemSubscriber,

    NotificationPreparationTimeSubscriber,

    NotificationRatingSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
