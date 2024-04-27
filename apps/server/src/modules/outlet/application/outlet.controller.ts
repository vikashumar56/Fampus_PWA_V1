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
import { Outlet, OutletDomainFacade } from '@server/modules/outlet/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { OutletApplicationEvent } from './outlet.application.event'
import { OutletCreateDto, OutletUpdateDto } from './outlet.dto'

@Controller('/v1/outlets')
export class OutletController {
  constructor(
    private eventService: EventService,
    private outletDomainFacade: OutletDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.outletDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: OutletCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.outletDomainFacade.create(body)

    await this.eventService.emit<OutletApplicationEvent.OutletCreated.Payload>(
      OutletApplicationEvent.OutletCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:outletId')
  async findOne(@Param('outletId') outletId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.outletDomainFacade.findOneByIdOrFail(
      outletId,
      queryOptions,
    )

    return item
  }

  @Patch('/:outletId')
  async update(
    @Param('outletId') outletId: string,
    @Body() body: OutletUpdateDto,
  ) {
    const item = await this.outletDomainFacade.findOneByIdOrFail(outletId)

    const itemUpdated = await this.outletDomainFacade.update(
      item,
      body as Partial<Outlet>,
    )
    return itemUpdated
  }

  @Delete('/:outletId')
  async delete(@Param('outletId') outletId: string) {
    const item = await this.outletDomainFacade.findOneByIdOrFail(outletId)

    await this.outletDomainFacade.delete(item)

    return item
  }
}
