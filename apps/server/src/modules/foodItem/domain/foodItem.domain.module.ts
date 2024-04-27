import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { FoodItemDomainFacade } from './foodItem.domain.facade'
import { FoodItem } from './foodItem.model'

@Module({
  imports: [TypeOrmModule.forFeature([FoodItem]), DatabaseHelperModule],
  providers: [FoodItemDomainFacade, FoodItemDomainFacade],
  exports: [FoodItemDomainFacade],
})
export class FoodItemDomainModule {}
