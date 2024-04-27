import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { FoodItemDomainModule } from '../domain'
import { FoodItemController } from './foodItem.controller'

import { OutletDomainModule } from '../../../modules/outlet/domain'

import { FoodItemByOutletController } from './foodItemByOutlet.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    FoodItemDomainModule,

    OutletDomainModule,
  ],
  controllers: [FoodItemController, FoodItemByOutletController],
  providers: [],
})
export class FoodItemApplicationModule {}
