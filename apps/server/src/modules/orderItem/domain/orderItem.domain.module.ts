import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { OrderItemDomainFacade } from './orderItem.domain.facade'
import { OrderItem } from './orderItem.model'

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), DatabaseHelperModule],
  providers: [OrderItemDomainFacade, OrderItemDomainFacade],
  exports: [OrderItemDomainFacade],
})
export class OrderItemDomainModule {}
