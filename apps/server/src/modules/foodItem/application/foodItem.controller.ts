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
import { FoodItem, FoodItemDomainFacade } from '@server/modules/foodItem/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { FoodItemApplicationEvent } from './foodItem.application.event'
import { FoodItemCreateDto, FoodItemUpdateDto } from './foodItem.dto'

@Controller('/v1/foodItems')
export class FoodItemController {
  constructor(
    private eventService: EventService,
    private foodItemDomainFacade: FoodItemDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.foodItemDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: FoodItemCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.foodItemDomainFacade.create(body)

    await this.eventService.emit<FoodItemApplicationEvent.FoodItemCreated.Payload>(
      FoodItemApplicationEvent.FoodItemCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:foodItemId')
  async findOne(
    @Param('foodItemId') foodItemId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.foodItemDomainFacade.findOneByIdOrFail(
      foodItemId,
      queryOptions,
    )

    return item
  }

  @Patch('/:foodItemId')
  async update(
    @Param('foodItemId') foodItemId: string,
    @Body() body: FoodItemUpdateDto,
  ) {
    const item = await this.foodItemDomainFacade.findOneByIdOrFail(foodItemId)

    const itemUpdated = await this.foodItemDomainFacade.update(
      item,
      body as Partial<FoodItem>,
    )
    return itemUpdated
  }

  @Delete('/:foodItemId')
  async delete(@Param('foodItemId') foodItemId: string) {
    const item = await this.foodItemDomainFacade.findOneByIdOrFail(foodItemId)

    await this.foodItemDomainFacade.delete(item)

    return item
  }
}
