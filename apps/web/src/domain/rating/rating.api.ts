import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Rating } from './rating.model'

export class RatingApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Rating>,
  ): Promise<Rating[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/ratings${buildOptions}`)
  }

  static findOne(
    ratingId: string,
    queryOptions?: ApiHelper.QueryOptions<Rating>,
  ): Promise<Rating> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/ratings/${ratingId}${buildOptions}`)
  }

  static createOne(values: Partial<Rating>): Promise<Rating> {
    return HttpService.api.post(`/v1/ratings`, values)
  }

  static updateOne(ratingId: string, values: Partial<Rating>): Promise<Rating> {
    return HttpService.api.patch(`/v1/ratings/${ratingId}`, values)
  }

  static deleteOne(ratingId: string): Promise<void> {
    return HttpService.api.delete(`/v1/ratings/${ratingId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Rating>,
  ): Promise<Rating[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/ratings${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Rating>,
  ): Promise<Rating> {
    return HttpService.api.post(`/v1/users/user/${userId}/ratings`, values)
  }

  static findManyByOutletId(
    outletId: string,
    queryOptions?: ApiHelper.QueryOptions<Rating>,
  ): Promise<Rating[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/outlets/outlet/${outletId}/ratings${buildOptions}`,
    )
  }

  static createOneByOutletId(
    outletId: string,
    values: Partial<Rating>,
  ): Promise<Rating> {
    return HttpService.api.post(
      `/v1/outlets/outlet/${outletId}/ratings`,
      values,
    )
  }
}
