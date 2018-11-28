export const TYPES:string[] =
[
  "Normal", "Fighting", "Flying", "Poison",
  "Ground", "Rock", "Bug", "Ghost", "Steel",
  "Fire", "Water", "Grass", "Electric",
  "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];

export const STATS:string[] =
[
  "HP", "ATK", "DEF", "S.ATK", "S.DEF", "SPD", "SS"
];

export const EVOLUTIONS:string[] =
[
  "Tiny", "Medium", "Final", "Mega", "Mega R2"
];

export const ELEMENTS = {
    fire: {
            strong: ["Grass", "Ice","Bug", "Steel"],
            weak: ["Fire", "Water", "Rock", "Dragon"],
            half: ["Fire", "Grass", "Ice", "Bug","Steel","Fairy"],
            effective: ["Water", "Ground", "Rock"]
          }
};
