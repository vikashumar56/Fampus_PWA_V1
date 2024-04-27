import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OutletDomainModule } from '../domain'
import { OutletController } from './outlet.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { OutletByUserController } from './outletByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, OutletDomainModule, UserDomainModule],
  controllers: [OutletController, OutletByUserController],
  providers: [],
})
export class OutletApplicationModule {}
