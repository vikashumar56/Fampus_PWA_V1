import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OrderItemDomainFacade } from '@server/modules/orderItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OrderItemApplicationEvent } from './orderItem.application.event'
import { OrderItemCreateDto } from './orderItem.dto'

import { OrderDomainFacade } from '../../order/domain'

@Controller('/v1/orders')
export class OrderItemByOrderController {
  constructor(
    private orderDomainFacade: OrderDomainFacade,

    private orderItemDomainFacade: OrderItemDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/order/:orderId/orderItems')
  async findManyOrderId(
    @Param('orderId') orderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.orderDomainFacade.findOneByIdOrFail(orderId)

    const items = await this.orderItemDomainFacade.findManyByOrder(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/order/:orderId/orderItems')
  async createByOrderId(
    @Param('orderId') orderId: string,
    @Body() body: OrderItemCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, orderId }

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
