import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RatingDomainFacade } from './rating.domain.facade'
import { Rating } from './rating.model'

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), DatabaseHelperModule],
  providers: [RatingDomainFacade, RatingDomainFacade],
  exports: [RatingDomainFacade],
})
export class RatingDomainModule {}
