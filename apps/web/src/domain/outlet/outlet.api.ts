import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Outlet } from './outlet.model'

export class OutletApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Outlet>,
  ): Promise<Outlet[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/outlets${buildOptions}`)
  }

  static findOne(
    outletId: string,
    queryOptions?: ApiHelper.QueryOptions<Outlet>,
  ): Promise<Outlet> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/outlets/${outletId}${buildOptions}`)
  }

  static createOne(values: Partial<Outlet>): Promise<Outlet> {
    return HttpService.api.post(`/v1/outlets`, values)
  }

  static updateOne(outletId: string, values: Partial<Outlet>): Promise<Outlet> {
    return HttpService.api.patch(`/v1/outlets/${outletId}`, values)
  }

  static deleteOne(outletId: string): Promise<void> {
    return HttpService.api.delete(`/v1/outlets/${outletId}`)
  }

  static findManyByOwnerId(
    ownerId: string,
    queryOptions?: ApiHelper.QueryOptions<Outlet>,
  ): Promise<Outlet[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/owner/${ownerId}/outlets${buildOptions}`,
    )
  }

  static createOneByOwnerId(
    ownerId: string,
    values: Partial<Outlet>,
  ): Promise<Outlet> {
    return HttpService.api.post(`/v1/users/owner/${ownerId}/outlets`, values)
  }
}
