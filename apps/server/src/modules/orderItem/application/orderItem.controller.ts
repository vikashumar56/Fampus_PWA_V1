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
import {
  OrderItem,
  OrderItemDomainFacade,
} from '@server/modules/orderItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { OrderItemApplicationEvent } from './orderItem.application.event'
import { OrderItemCreateDto, OrderItemUpdateDto } from './orderItem.dto'

@Controller('/v1/orderItems')
export class OrderItemController {
  constructor(
    private eventService: EventService,
    private orderItemDomainFacade: OrderItemDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.orderItemDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: OrderItemCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.orderItemDomainFacade.create(body)

    await this.eventService.emit<OrderItemApplicationEvent.OrderItemCreated.Payload>(
      OrderItemApplicationEvent.OrderItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:orderItemId')
  async findOne(
    @Param('orderItemId') orderItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.orderItemDomainFacade.findOneByIdOrFail(
      orderItemId,
      queryOptions,
    )

    return item
  }

  @Patch('/:orderItemId')
  async update(
    @Param('orderItemId') orderItemId: string,
    @Body() body: OrderItemUpdateDto,
  ) {
    const item = await this.orderItemDomainFacade.findOneByIdOrFail(orderItemId)

    const itemUpdated = await this.orderItemDomainFacade.update(
      item,
      body as Partial<OrderItem>,
    )
    return itemUpdated
  }

  @Delete('/:orderItemId')
  async delete(@Param('orderItemId') orderItemId: string) {
    const item = await this.orderItemDomainFacade.findOneByIdOrFail(orderItemId)

    await this.orderItemDomainFacade.delete(item)

    return item
  }
}
