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
  PreparationTime,
  PreparationTimeDomainFacade,
} from '@server/modules/preparationTime/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PreparationTimeApplicationEvent } from './preparationTime.application.event'
import {
  PreparationTimeCreateDto,
  PreparationTimeUpdateDto,
} from './preparationTime.dto'

@Controller('/v1/preparationTimes')
export class PreparationTimeController {
  constructor(
    private eventService: EventService,
    private preparationTimeDomainFacade: PreparationTimeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.preparationTimeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: PreparationTimeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.preparationTimeDomainFacade.create(body)

    await this.eventService.emit<PreparationTimeApplicationEvent.PreparationTimeCreated.Payload>(
      PreparationTimeApplicationEvent.PreparationTimeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:preparationTimeId')
  async findOne(
    @Param('preparationTimeId') preparationTimeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.preparationTimeDomainFacade.findOneByIdOrFail(
      preparationTimeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:preparationTimeId')
  async update(
    @Param('preparationTimeId') preparationTimeId: string,
    @Body() body: PreparationTimeUpdateDto,
  ) {
    const item =
      await this.preparationTimeDomainFacade.findOneByIdOrFail(
        preparationTimeId,
      )

    const itemUpdated = await this.preparationTimeDomainFacade.update(
      item,
      body as Partial<PreparationTime>,
    )
    return itemUpdated
  }

  @Delete('/:preparationTimeId')
  async delete(@Param('preparationTimeId') preparationTimeId: string) {
    const item =
      await this.preparationTimeDomainFacade.findOneByIdOrFail(
        preparationTimeId,
      )

    await this.preparationTimeDomainFacade.delete(item)

    return item
  }
}
