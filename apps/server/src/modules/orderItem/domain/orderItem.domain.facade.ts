import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { OrderItem } from './orderItem.model'

import { Order } from '../../order/domain'

import { FoodItem } from '../../foodItem/domain'

@Injectable()
export class OrderItemDomainFacade {
  constructor(
    @InjectRepository(OrderItem)
    private repository: Repository<OrderItem>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<OrderItem>): Promise<OrderItem> {
    return this.repository.save(values)
  }

  async update(
    item: OrderItem,
    values: Partial<OrderItem>,
  ): Promise<OrderItem> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: OrderItem): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<OrderItem> = {},
  ): Promise<OrderItem[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<OrderItem> = {},
  ): Promise<OrderItem> {
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

  async findManyByOrder(
    item: Order,
    queryOptions: RequestHelper.QueryOptions<OrderItem> = {},
  ): Promise<OrderItem[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('order')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        orderId: item.id,
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
    queryOptions: RequestHelper.QueryOptions<OrderItem> = {},
  ): Promise<OrderItem[]> {
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
