import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { OutletApplicationModule } from './outlet/application'

import { FoodItemApplicationModule } from './foodItem/application'

import { OrderApplicationModule } from './order/application'

import { OrderItemApplicationModule } from './orderItem/application'

import { PreparationTimeApplicationModule } from './preparationTime/application'

import { RatingApplicationModule } from './rating/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    OutletApplicationModule,

    FoodItemApplicationModule,

    OrderApplicationModule,

    OrderItemApplicationModule,

    PreparationTimeApplicationModule,

    RatingApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
