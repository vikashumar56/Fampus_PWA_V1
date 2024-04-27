import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RatingDomainModule } from '../domain'
import { RatingController } from './rating.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { RatingByUserController } from './ratingByUser.controller'

import { OutletDomainModule } from '../../../modules/outlet/domain'

import { RatingByOutletController } from './ratingByOutlet.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    RatingDomainModule,

    UserDomainModule,

    OutletDomainModule,
  ],
  controllers: [
    RatingController,

    RatingByUserController,

    RatingByOutletController,
  ],
  providers: [],
})
export class RatingApplicationModule {}
