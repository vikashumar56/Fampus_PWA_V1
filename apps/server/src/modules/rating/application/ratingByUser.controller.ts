import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { RatingDomainFacade } from '@server/modules/rating/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RatingApplicationEvent } from './rating.application.event'
import { RatingCreateDto } from './rating.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class RatingByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private ratingDomainFacade: RatingDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/ratings')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.ratingDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/ratings')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: RatingCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
