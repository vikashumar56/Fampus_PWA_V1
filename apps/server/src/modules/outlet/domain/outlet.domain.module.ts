import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { OutletDomainFacade } from './outlet.domain.facade'
import { Outlet } from './outlet.model'

@Module({
  imports: [TypeOrmModule.forFeature([Outlet]), DatabaseHelperModule],
  providers: [OutletDomainFacade, OutletDomainFacade],
  exports: [OutletDomainFacade],
})
export class OutletDomainModule {}
