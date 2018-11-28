export class Pokemon {

    constructor (
        public name: string,
        public pokedex: number,  // Pokédex Nº
        public picture: string,
        public grade: string,  // S, R, SR, SSR
        public evolution: string,  // Tiny, Mega, R2..
        public info: string,  // Pokédex Info
        public type: string,  // Fire, Water, Grass..
        public type2: string,  // Fire, Water, Grass..
        public attack: string,  // Physical, Special..
        public legend: string,  // Legendary?
        public description: string,
        public family: string,
        public HP: number,
        public ATK: number,
        public DEF: number,
        public SATK: number,
        public SDEF: number,
        public SPD: number,
        public SS: number,
        public _id?: string
    ) { }

}
