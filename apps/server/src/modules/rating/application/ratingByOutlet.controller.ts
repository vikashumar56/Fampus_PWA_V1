import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RatingDomainFacade } from '@server/modules/rating/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RatingApplicationEvent } from './rating.application.event'
import { RatingCreateDto } from './rating.dto'

import { OutletDomainFacade } from '../../outlet/domain'

@Controller('/v1/outlets')
export class RatingByOutletController {
  constructor(
    private outletDomainFacade: OutletDomainFacade,

    private ratingDomainFacade: RatingDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/outlet/:outletId/ratings')
  async findManyOutletId(
    @Param('outletId') outletId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.outletDomainFacade.findOneByIdOrFail(outletId)

    const items = await this.ratingDomainFacade.findManyByOutlet(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/outlet/:outletId/ratings')
  async createByOutletId(
    @Param('outletId') outletId: string,
    @Body() body: RatingCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, outletId }

    const item = await this.ratingDomainFacade.create(valuesUpdated)

    await this.eventService.emit<RatingApplicationEvent.RatingCreated.Payload>(
      RatingApplicationEvent.RatingCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
