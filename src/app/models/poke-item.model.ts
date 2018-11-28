export class PokeItem {

    constructor(
      public item: string,
      public type: string,  // Fire, Water, Grass..
      public grade: string,  // Common, Rare, Legend, Gym..
      public picture: string,
      public info: string,
      public _id?: string,
    ){}
}
