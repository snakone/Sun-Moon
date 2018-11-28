export class Move {

  constructor (
      public _id: string,  // MongoDB ID
      public name: string,  // Move Name
      public z: string,  // Its Z, R2, Normal Move?
      public power: number,  // Move Power
      public hit: number,  // Hit Rate
      public pp: number,  // PP of Pokemon Move
      public type: string,  // Type Grass/Fire/Water..
      public attack: string,  // Physical/Special
      public info: string,  // Info about the Move
    ){}
}
