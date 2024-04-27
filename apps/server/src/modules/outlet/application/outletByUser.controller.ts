import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OutletDomainFacade } from '@server/modules/outlet/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OutletApplicationEvent } from './outlet.application.event'
import { OutletCreateDto } from './outlet.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class OutletByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private outletDomainFacade: OutletDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/owner/:ownerId/outlets')
  async findManyOwnerId(
    @Param('ownerId') ownerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(ownerId)

    const items = await this.outletDomainFacade.findManyByOwner(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/owner/:ownerId/outlets')
  async createByOwnerId(
    @Param('ownerId') ownerId: string,
    @Body() body: OutletCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, ownerId }

    const item = await this.outletDomainFacade.create(valuesUpdated)

    await this.eventService.emit<OutletApplicationEvent.OutletCreated.Payload>(
      OutletApplicationEvent.OutletCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
