export namespace OrderItemApplicationEvent {
  export namespace OrderItemCreated {
    export const key = 'orderItem.application.orderItem.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
