export namespace PreparationTimeApplicationEvent {
  export namespace PreparationTimeCreated {
    export const key = 'preparationTime.application.preparationTime.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
