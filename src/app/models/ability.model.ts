export class Ability {

  constructor (
      public _id: string,  // MongoDB ID
      public name: string,  // Ability Name
      public ability: string,  // Name no spaces
      public picture: string,  // redpurple, yelloworange...
      public type: string,  // ATK, DEF, SPD
      public grade: string,  // // Purple, Green...
      public shards: number,  // Nº Shards
      public info: string,  // Info about the Move
    ){}
}
