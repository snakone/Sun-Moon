import { Pokemon } from "./pokemon.model";

export class Trainer {

    constructor(
      public name: string,
      public email: string,
      public password: string,
      public _id?: string,
      public image?: string,
      public role?: string,  // TRAINER, ADMIN
      public google?: boolean,
      public team: Pokemon[] = []
    ){}
}
