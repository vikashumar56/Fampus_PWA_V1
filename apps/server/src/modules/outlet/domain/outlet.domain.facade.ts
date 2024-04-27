import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Outlet } from './outlet.model'

import { User } from '../../user/domain'

@Injectable()
export class OutletDomainFacade {
  constructor(
    @InjectRepository(Outlet)
    private repository: Repository<Outlet>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Outlet>): Promise<Outlet> {
    return this.repository.save(values)
  }

  async update(item: Outlet, values: Partial<Outlet>): Promise<Outlet> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Outlet): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Outlet> = {},
  ): Promise<Outlet[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Outlet> = {},
  ): Promise<Outlet> {
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

  async findManyByOwner(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Outlet> = {},
  ): Promise<Outlet[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('owner')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        ownerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
