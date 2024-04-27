export namespace RatingApplicationEvent {
  export namespace RatingCreated {
    export const key = 'rating.application.rating.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
