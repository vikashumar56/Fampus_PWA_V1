import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { PreparationTime } from './preparationTime.model'

import { Outlet } from '../../outlet/domain'

import { FoodItem } from '../../foodItem/domain'

@Injectable()
export class PreparationTimeDomainFacade {
  constructor(
    @InjectRepository(PreparationTime)
    private repository: Repository<PreparationTime>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<PreparationTime>): Promise<PreparationTime> {
    return this.repository.save(values)
  }

  async update(
    item: PreparationTime,
    values: Partial<PreparationTime>,
  ): Promise<PreparationTime> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: PreparationTime): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<PreparationTime> = {},
  ): Promise<PreparationTime[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<PreparationTime> = {},
  ): Promise<PreparationTime> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByOutlet(
    item: Outlet,
    queryOptions: RequestHelper.QueryOptions<PreparationTime> = {},
  ): Promise<PreparationTime[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('outlet')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        outletId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByFoodItem(
    item: FoodItem,
    queryOptions: RequestHelper.QueryOptions<PreparationTime> = {},
  ): Promise<PreparationTime[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('foodItem')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        foodItemId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
