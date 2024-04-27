import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OrderItemDomainFacade } from '@server/modules/orderItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OrderItemApplicationEvent } from './orderItem.application.event'
import { OrderItemCreateDto } from './orderItem.dto'

import { FoodItemDomainFacade } from '../../foodItem/domain'

@Controller('/v1/foodItems')
export class OrderItemByFoodItemController {
  constructor(
    private foodItemDomainFacade: FoodItemDomainFacade,

    private orderItemDomainFacade: OrderItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/foodItem/:foodItemId/orderItems')
  async findManyFoodItemId(
    @Param('foodItemId') foodItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.foodItemDomainFacade.findOneByIdOrFail(foodItemId)

    const items = await this.orderItemDomainFacade.findManyByFoodItem(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/foodItem/:foodItemId/orderItems')
  async createByFoodItemId(
    @Param('foodItemId') foodItemId: string,
    @Body() body: OrderItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, foodItemId }

    const item = await this.orderItemDomainFacade.create(valuesUpdated)

    await this.eventService.emit<OrderItemApplicationEvent.OrderItemCreated.Payload>(
      OrderItemApplicationEvent.OrderItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
