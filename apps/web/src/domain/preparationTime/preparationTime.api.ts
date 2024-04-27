import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { PreparationTime } from './preparationTime.model'

export class PreparationTimeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<PreparationTime>,
  ): Promise<PreparationTime[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/preparationTimes${buildOptions}`)
  }

  static findOne(
    preparationTimeId: string,
    queryOptions?: ApiHelper.QueryOptions<PreparationTime>,
  ): Promise<PreparationTime> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/preparationTimes/${preparationTimeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<PreparationTime>): Promise<PreparationTime> {
    return HttpService.api.post(`/v1/preparationTimes`, values)
  }

  static updateOne(
    preparationTimeId: string,
    values: Partial<PreparationTime>,
  ): Promise<PreparationTime> {
    return HttpService.api.patch(
      `/v1/preparationTimes/${preparationTimeId}`,
      values,
    )
  }

  static deleteOne(preparationTimeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/preparationTimes/${preparationTimeId}`)
  }

  static findManyByOutletId(
    outletId: string,
    queryOptions?: ApiHelper.QueryOptions<PreparationTime>,
  ): Promise<PreparationTime[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/outlets/outlet/${outletId}/preparationTimes${buildOptions}`,
    )
  }

  static createOneByOutletId(
    outletId: string,
    values: Partial<PreparationTime>,
  ): Promise<PreparationTime> {
    return HttpService.api.post(
      `/v1/outlets/outlet/${outletId}/preparationTimes`,
      values,
    )
  }

  static findManyByFoodItemId(
    foodItemId: string,
    queryOptions?: ApiHelper.QueryOptions<PreparationTime>,
  ): Promise<PreparationTime[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/foodItems/foodItem/${foodItemId}/preparationTimes${buildOptions}`,
    )
  }

  static createOneByFoodItemId(
    foodItemId: string,
    values: Partial<PreparationTime>,
  ): Promise<PreparationTime> {
    return HttpService.api.post(
      `/v1/foodItems/foodItem/${foodItemId}/preparationTimes`,
      values,
    )
  }
}
