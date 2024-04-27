export namespace OutletApplicationEvent {
  export namespace OutletCreated {
    export const key = 'outlet.application.outlet.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
