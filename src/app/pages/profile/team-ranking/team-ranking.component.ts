import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-team-ranking',
  templateUrl: './team-ranking.component.html',
  styleUrls: ['./team-ranking.component.scss']
})

export class TeamRankingComponent implements OnInit, OnChanges {

  @Input() trainer: Trainer;
  maxSS: number; pokemonSS: Pokemon = <Pokemon>{};  // Empty Object
  maxHP: number; pokemonHP: Pokemon = <Pokemon>{};
  maxATK: number; pokemonATK: Pokemon = <Pokemon>{};
  maxDEF: number; pokemonDEF: Pokemon = <Pokemon>{};
  maxSATK: number; pokemonSATK: Pokemon = <Pokemon>{};
  maxSDEF: number; pokemonSDEF: Pokemon = <Pokemon>{};
  maxSPD: number; pokemonSPD: Pokemon = <Pokemon>{};

  urlImage: string = "../../../../../assets/images/icon/";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){  // Subscribe to Trainer Team Changes
    this.calculateStatSS(changes.trainer.currentValue.team);  // Calculate Total SS of Trainer
  }

  calculateStatSS(team:Pokemon[]){
    this.maxSS = 0; this.maxHP = 0; this.maxATK = 0; this.maxDEF = 0;
    this.maxSATK = 0; this.maxSDEF = 0; this.maxSPD = 0;

    for (let i in team){
        if (this.maxSS < team[i].SS){  // Pokémon SS
          this.maxSS = team[i].SS;
          this.pokemonSS = team[i];
        }

        if (this.maxHP < team[i].HP){  // Pokémon HP
          this.maxHP = team[i].HP;
          this.pokemonHP = team[i];
        }

        if (this.maxATK < team[i].ATK){  // Pokémon ATK
          this.maxATK = team[i].ATK;
          this.pokemonATK = team[i];
        }

        if (this.maxDEF < team[i].DEF){  // Pokémon DEF
          this.maxDEF = team[i].DEF;
          this.pokemonDEF = team[i];
        }

        if (this.maxSATK < team[i].SATK){  // Pokémon S.ATK
          this.maxSATK = team[i].SATK;
          this.pokemonSATK = team[i];
        }

        if (this.maxSDEF < team[i].SDEF){  // Pokémon S.DEF
          this.maxSDEF = team[i].SDEF;
          this.pokemonSDEF = team[i];
        }

        if (this.maxSPD < team[i].SPD){  // Pokémon SPD
          this.maxSPD = team[i].SPD;
          this.pokemonSPD = team[i];
        }
      }  // End of For
    }

}
