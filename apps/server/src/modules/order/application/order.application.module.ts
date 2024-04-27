import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OrderDomainModule } from '../domain'
import { OrderController } from './order.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { OrderByUserController } from './orderByUser.controller'

import { OutletDomainModule } from '../../../modules/outlet/domain'

import { OrderByOutletController } from './orderByOutlet.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    OrderDomainModule,

    UserDomainModule,

    OutletDomainModule,
  ],
  controllers: [
    OrderController,

    OrderByUserController,

    OrderByOutletController,
  ],
  providers: [],
})
export class OrderApplicationModule {}
