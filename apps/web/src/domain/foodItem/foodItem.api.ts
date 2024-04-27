import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { FoodItem } from './foodItem.model'

export class FoodItemApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<FoodItem>,
  ): Promise<FoodItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/foodItems${buildOptions}`)
  }

  static findOne(
    foodItemId: string,
    queryOptions?: ApiHelper.QueryOptions<FoodItem>,
  ): Promise<FoodItem> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/foodItems/${foodItemId}${buildOptions}`)
  }

  static createOne(values: Partial<FoodItem>): Promise<FoodItem> {
    return HttpService.api.post(`/v1/foodItems`, values)
  }

  static updateOne(
    foodItemId: string,
    values: Partial<FoodItem>,
  ): Promise<FoodItem> {
    return HttpService.api.patch(`/v1/foodItems/${foodItemId}`, values)
  }

  static deleteOne(foodItemId: string): Promise<void> {
    return HttpService.api.delete(`/v1/foodItems/${foodItemId}`)
  }

  static findManyByOutletId(
    outletId: string,
    queryOptions?: ApiHelper.QueryOptions<FoodItem>,
  ): Promise<FoodItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/outlets/outlet/${outletId}/foodItems${buildOptions}`,
    )
  }

  static createOneByOutletId(
    outletId: string,
    values: Partial<FoodItem>,
  ): Promise<FoodItem> {
    return HttpService.api.post(
      `/v1/outlets/outlet/${outletId}/foodItems`,
      values,
    )
  }
}
