import { Injectable } from '@angular/core';
import { TypeStats } from 'src/app/models/type-stats.model';

@Injectable({
  providedIn: 'root'
})

export class TypeStatsService {

  strong: any[]; // ATK -+
  weak: any[]; // ATK -
  half: any[]; // DEF +
  effective: any[]; // DEF -
  invulnerable: any[];
  allTypes: Object = {};

  constructor() { }

  getTypes(types:any[]):TypeStats {
    this.strong = [];
    this.weak = [];
    this.half = [];
    this.effective = [];
    this.invulnerable = [];

      for (let i in types){
        this.checkType(types[i]);
      }

    let strong = Array.from(new Set(this.strong));
    let weak = Array.from(new Set(this.weak));
    let half = Array.from(new Set(this.half));
    let effective = Array.from(new Set(this.effective));
    let invulnerable = Array.from(new Set(this.invulnerable));

    return new TypeStats(strong, weak, effective, half, invulnerable);
  }

  removeOddTypes(types1:TypeStats, types2:TypeStats){

    let types1Effective = types1.effective.filter(x => !types2.half.includes(x));
    let types2Effective = types2.effective.filter(x => !types1.half.includes(x));

    let types1Half = types1.half.filter(x => !types2.effective.includes(x));
    let types2Half = types2.half.filter(x => !types1.effective.includes(x));

    types1Effective = types1Effective.filter(x => !types2.invulnerable.includes(x));
    types2Effective = types2Effective.filter(x => !types1.invulnerable.includes(x));

    let strong = types1.strong.concat(types2.strong);
    let weak = types1.weak.concat(types2.weak);
    let effective = types1Effective.concat(types2Effective);
    let half = types1Half.concat(types2Half);
    let invulnerable = types1.invulnerable.concat(types2.invulnerable);

    let teamStrong = Array.from(new Set(strong));
    let teamWeak = Array.from(new Set(weak));
    let teamEffective = Array.from(new Set(effective));
    let teamHalf = Array.from(new Set(half));
    let teamInvulnerable = Array.from(new Set(invulnerable));

    teamWeak = teamWeak.filter(x => !teamStrong.includes(x));
    teamEffective = teamEffective.filter(x => !teamHalf.includes(x));

    return new TypeStats(teamStrong, teamWeak, teamEffective, teamHalf, teamInvulnerable);

  }

  checkType(type:string){
    switch (type){
      case 'Normal':
      this.weak.push("Rock", "Steel");
      this.effective.push("Fighting");
      this.invulnerable.push("Ghost");
      break;
      case 'Fighting':
      this.strong.push("Normal", "Ice", "Rock", "Dark", "Steel");
      this.weak.push("Poison", "Flying", "Psychic", "Bug", "Fairy");
      this.half.push("Bug", "Rock", "Dark");
      this.effective.push("Flying", "Psychic", "Fairy");
      break;
      case 'Flying':
      this.strong.push("Grass", "Fighting", "Bug");
      this.weak.push("Electric", "Rock", "Steel");
      this.half.push("Grass", "Fighting", "Bug");
      this.effective.push("Electric", "Ice", "Rock");
      this.invulnerable.push("Ground");
      break;
      case 'Poison':
      this.strong.push("Grass", "Fairy");
      this.weak.push("Poison", "Ground", "Rock", "Ghost");
      this.half.push("Grass", "Fighting", "Poison", "Bug", "Fairy");
      this.effective.push("Ground", "Psychic");
      break;
      case 'Ground':
      this.strong.push("Fire", "Electric", "Poison", "Rock", "Steel");
      this.weak.push("Grass", "Bug");
      this.half.push("Poison", "Rock");
      this.effective.push("Water", "Grass", "Ice");
      this.invulnerable.push("Electric");
      break;
      case 'Rock':
      this.strong.push("Fire", "Ice", "Flying", "Bug");
      this.weak.push("Fighting", "Ground", "Steel");
      this.half.push("Normal", "Fire", "Poison", "Flying");
      this.effective.push("Water", "Grass", "Fighting", "Ground", "Steel");
      break;
      case 'Bug':
      this.strong.push("Grass", "Psychic", "Dark");
      this.weak.push("Fire", "Fighting", "Poison",
                     "Flying", "Ghost", "Steel", "Fairy");
      this.half.push("Grass", "Fighting", "Ground");
      this.effective.push("Fire", "Flying", "Rock");
      break;
      case 'Ghost':
      this.strong.push("Psychic", "Ghost");
      this.weak.push("Dark");
      this.half.push("Poison", "Bug");
      this.effective.push("Ghost", "Dark");
      this.invulnerable.push("Normal", "Fighting");
      break;
      case 'Steel':
      this.strong.push("Ice", "Rock", "Fairy");
      this.weak.push("Fire", "Water", "Electric", "Steel");
      this.half.push("Normal", "Grass", "Ice", "Flying", "Psychic",
                     "Bug", "Rock", "Dragon", "Steel", "Fairy");
      this.effective.push("Fire", "Fighting", "Ground");
      this.invulnerable.push("Poison");
      break;
      case 'Fire':
      this.strong.push("Grass", "Ice", "Bug", "Steel");
      this.weak.push("Fire", "Water", "Rock", "Dragon");
      this.half.push("Fire", "Grass", "Ice", "Bug", "Steel", "Fairy");
      this.effective.push("Water", "Ground", "Rock");
      break;
      case 'Water':
      this.strong.push("Fire", "Ground", "Rock");
      this.weak.push("Water", "Grass", "Dragon");
      this.half.push("Fire", "Water", "Ice", "Steel");
      this.effective.push("Electric", "Grass");
      break;
      case 'Grass':
      this.strong.push("Water", "Ground", "Rock");
      this.weak.push("Fire", "Grass", "Poison", "Flying",
                     "Bug", "Dragon", "Steel");
      this.half.push("Water", "Electric", "Grass", "Ground");
      this.effective.push("Fire", "Ice", "Poison", "Flying", "Bug");
      break;
      case 'Electric':
      this.strong.push("Water", "Flying");
      this.weak.push("Electric", "Grass", "Dragon");
      this.half.push("Electric", "Flying", "Steel");
      this.effective.push("Ground");
      break;
      case 'Psychic':
      this.strong.push("Fighting", "Poison");
      this.weak.push("Psychic", "Steel");
      this.half.push("Fighting", "Psychic");
      this.effective.push("Bug", "Ghost", "Dark");
      break;
      case 'Ice':
      this.strong.push("Grass", "Ground", "Flying", "Dragon");
      this.weak.push("Fire", "Water", "Ice", "Steel");
      this.half.push("Ice");
      this.effective.push("Fire", "Fighting", "Rock", "Steel");
      break;
      case 'Dragon':
      this.strong.push("Dragon");
      this.weak.push("Steel");
      this.half.push("Fire", "Water", "Electric", "Grass");
      this.effective.push("Ice", "Dragon", "Fairy");
      break;
      case 'Dark':
      this.strong.push("Psychic", "Ghost");
      this.weak.push("Fighting", "Dark", "Fairy");
      this.half.push("Ghost", "Dark");
      this.effective.push("Fighting", "Bug", "Fairy");
      this.invulnerable.push("Psychic");
      break;
      case 'Fairy':
      this.strong.push("Fighting", "Dragon", "Dark");
      this.weak.push("Fire", "Poison", "Steel");
      this.half.push("Fighting", "Bug", "Dark");
      this.effective.push("Poison", "Steel");
      this.invulnerable.push("Dragon");
      break;
    }
  }
}
