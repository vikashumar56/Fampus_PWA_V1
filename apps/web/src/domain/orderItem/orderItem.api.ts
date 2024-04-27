import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { OrderItem } from './orderItem.model'

export class OrderItemApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<OrderItem>,
  ): Promise<OrderItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orderItems${buildOptions}`)
  }

  static findOne(
    orderItemId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderItem>,
  ): Promise<OrderItem> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/orderItems/${orderItemId}${buildOptions}`)
  }

  static createOne(values: Partial<OrderItem>): Promise<OrderItem> {
    return HttpService.api.post(`/v1/orderItems`, values)
  }

  static updateOne(
    orderItemId: string,
    values: Partial<OrderItem>,
  ): Promise<OrderItem> {
    return HttpService.api.patch(`/v1/orderItems/${orderItemId}`, values)
  }

  static deleteOne(orderItemId: string): Promise<void> {
    return HttpService.api.delete(`/v1/orderItems/${orderItemId}`)
  }

  static findManyByOrderId(
    orderId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderItem>,
  ): Promise<OrderItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/orders/order/${orderId}/orderItems${buildOptions}`,
    )
  }

  static createOneByOrderId(
    orderId: string,
    values: Partial<OrderItem>,
  ): Promise<OrderItem> {
    return HttpService.api.post(
      `/v1/orders/order/${orderId}/orderItems`,
      values,
    )
  }

  static findManyByFoodItemId(
    foodItemId: string,
    queryOptions?: ApiHelper.QueryOptions<OrderItem>,
  ): Promise<OrderItem[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/foodItems/foodItem/${foodItemId}/orderItems${buildOptions}`,
    )
  }

  static createOneByFoodItemId(
    foodItemId: string,
    values: Partial<OrderItem>,
  ): Promise<OrderItem> {
    return HttpService.api.post(
      `/v1/foodItems/foodItem/${foodItemId}/orderItems`,
      values,
    )
  }
}
