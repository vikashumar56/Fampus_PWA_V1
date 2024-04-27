export namespace FoodItemApplicationEvent {
  export namespace FoodItemCreated {
    export const key = 'foodItem.application.foodItem.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
