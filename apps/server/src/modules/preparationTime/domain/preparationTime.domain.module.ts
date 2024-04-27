import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PreparationTimeDomainFacade } from './preparationTime.domain.facade'
import { PreparationTime } from './preparationTime.model'

@Module({
  imports: [TypeOrmModule.forFeature([PreparationTime]), DatabaseHelperModule],
  providers: [PreparationTimeDomainFacade, PreparationTimeDomainFacade],
  exports: [PreparationTimeDomainFacade],
})
export class PreparationTimeDomainModule {}
