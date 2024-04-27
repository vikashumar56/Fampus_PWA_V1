import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PreparationTimeDomainFacade } from '@server/modules/preparationTime/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PreparationTimeApplicationEvent } from './preparationTime.application.event'
import { PreparationTimeCreateDto } from './preparationTime.dto'

import { FoodItemDomainFacade } from '../../foodItem/domain'

@Controller('/v1/foodItems')
export class PreparationTimeByFoodItemController {
  constructor(
    private foodItemDomainFacade: FoodItemDomainFacade,

    private preparationTimeDomainFacade: PreparationTimeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/foodItem/:foodItemId/preparationTimes')
  async findManyFoodItemId(
    @Param('foodItemId') foodItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.foodItemDomainFacade.findOneByIdOrFail(foodItemId)

    const items = await this.preparationTimeDomainFacade.findManyByFoodItem(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/foodItem/:foodItemId/preparationTimes')
  async createByFoodItemId(
    @Param('foodItemId') foodItemId: string,
    @Body() body: PreparationTimeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, foodItemId }

    const item = await this.preparationTimeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PreparationTimeApplicationEvent.PreparationTimeCreated.Payload>(
      PreparationTimeApplicationEvent.PreparationTimeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
