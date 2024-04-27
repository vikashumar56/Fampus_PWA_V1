import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { OrderDomainFacade } from '@server/modules/order/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { OrderApplicationEvent } from './order.application.event'
import { OrderCreateDto } from './order.dto'

import { OutletDomainFacade } from '../../outlet/domain'

@Controller('/v1/outlets')
export class OrderByOutletController {
  constructor(
    private outletDomainFacade: OutletDomainFacade,

    private orderDomainFacade: OrderDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/outlet/:outletId/orders')
  async findManyOutletId(
    @Param('outletId') outletId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.outletDomainFacade.findOneByIdOrFail(outletId)

    const items = await this.orderDomainFacade.findManyByOutlet(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/outlet/:outletId/orders')
  async createByOutletId(
    @Param('outletId') outletId: string,
    @Body() body: OrderCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, outletId }

    const item = await this.orderDomainFacade.create(valuesUpdated)

    await this.eventService.emit<OrderApplicationEvent.OrderCreated.Payload>(
      OrderApplicationEvent.OrderCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
