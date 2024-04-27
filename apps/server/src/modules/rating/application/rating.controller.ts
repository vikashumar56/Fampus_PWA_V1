import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Rating, RatingDomainFacade } from '@server/modules/rating/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RatingApplicationEvent } from './rating.application.event'
import { RatingCreateDto, RatingUpdateDto } from './rating.dto'

@Controller('/v1/ratings')
export class RatingController {
  constructor(
    private eventService: EventService,
    private ratingDomainFacade: RatingDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.ratingDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RatingCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.ratingDomainFacade.create(body)

    await this.eventService.emit<RatingApplicationEvent.RatingCreated.Payload>(
      RatingApplicationEvent.RatingCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:ratingId')
  async findOne(@Param('ratingId') ratingId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.ratingDomainFacade.findOneByIdOrFail(
      ratingId,
      queryOptions,
    )

    return item
  }

  @Patch('/:ratingId')
  async update(
    @Param('ratingId') ratingId: string,
    @Body() body: RatingUpdateDto,
  ) {
    const item = await this.ratingDomainFacade.findOneByIdOrFail(ratingId)

    const itemUpdated = await this.ratingDomainFacade.update(
      item,
      body as Partial<Rating>,
    )
    return itemUpdated
  }

  @Delete('/:ratingId')
  async delete(@Param('ratingId') ratingId: string) {
    const item = await this.ratingDomainFacade.findOneByIdOrFail(ratingId)

    await this.ratingDomainFacade.delete(item)

    return item
  }
}
