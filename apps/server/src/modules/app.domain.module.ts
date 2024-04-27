import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { OutletDomainModule } from './outlet/domain'

import { FoodItemDomainModule } from './foodItem/domain'

import { OrderDomainModule } from './order/domain'

import { OrderItemDomainModule } from './orderItem/domain'

import { PreparationTimeDomainModule } from './preparationTime/domain'

import { RatingDomainModule } from './rating/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    OutletDomainModule,

    FoodItemDomainModule,

    OrderDomainModule,

    OrderItemDomainModule,

    PreparationTimeDomainModule,

    RatingDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
