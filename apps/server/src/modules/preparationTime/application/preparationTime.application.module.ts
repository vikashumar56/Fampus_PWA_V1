import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PreparationTimeDomainModule } from '../domain'
import { PreparationTimeController } from './preparationTime.controller'

import { OutletDomainModule } from '../../../modules/outlet/domain'

import { PreparationTimeByOutletController } from './preparationTimeByOutlet.controller'

import { FoodItemDomainModule } from '../../../modules/foodItem/domain'

import { PreparationTimeByFoodItemController } from './preparationTimeByFoodItem.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PreparationTimeDomainModule,

    OutletDomainModule,

    FoodItemDomainModule,
  ],
  controllers: [
    PreparationTimeController,

    PreparationTimeByOutletController,

    PreparationTimeByFoodItemController,
  ],
  providers: [],
})
export class PreparationTimeApplicationModule {}
