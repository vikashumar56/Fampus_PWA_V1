import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { FoodItemDomainFacade } from '@server/modules/foodItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { FoodItemApplicationEvent } from './foodItem.application.event'
import { FoodItemCreateDto } from './foodItem.dto'

import { OutletDomainFacade } from '../../outlet/domain'

@Controller('/v1/outlets')
export class FoodItemByOutletController {
  constructor(
    private outletDomainFacade: OutletDomainFacade,

    private foodItemDomainFacade: FoodItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/outlet/:outletId/foodItems')
  async findManyOutletId(
    @Param('outletId') outletId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.outletDomainFacade.findOneByIdOrFail(outletId)

    const items = await this.foodItemDomainFacade.findManyByOutlet(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/outlet/:outletId/foodItems')
  async createByOutletId(
    @Param('outletId') outletId: string,
    @Body() body: FoodItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, outletId }

    const item = await this.foodItemDomainFacade.create(valuesUpdated)

    await this.eventService.emit<FoodItemApplicationEvent.FoodItemCreated.Payload>(
      FoodItemApplicationEvent.FoodItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
