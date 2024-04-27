import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { FoodItem } from './foodItem.model'

import { Outlet } from '../../outlet/domain'

@Injectable()
export class FoodItemDomainFacade {
  constructor(
    @InjectRepository(FoodItem)
    private repository: Repository<FoodItem>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<FoodItem>): Promise<FoodItem> {
    return this.repository.save(values)
  }

  async update(item: FoodItem, values: Partial<FoodItem>): Promise<FoodItem> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: FoodItem): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<FoodItem> = {},
  ): Promise<FoodItem[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<FoodItem> = {},
  ): Promise<FoodItem> {
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
    queryOptions: RequestHelper.QueryOptions<FoodItem> = {},
  ): Promise<FoodItem[]> {
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
}
