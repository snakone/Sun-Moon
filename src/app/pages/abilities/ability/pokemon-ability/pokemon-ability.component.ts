import { Component, OnInit, Input } from '@angular/core';
import { Ability } from 'src/app/models/ability.model';
import { AbilityService } from 'src/app/services/services.index';

@Component({
  selector: 'sun-moon-pokemon-ability',
  templateUrl: './pokemon-ability.component.html',
  styleUrls: ['./pokemon-ability.component.scss']
})


export class PokemonAbilityComponent implements OnInit {

  @Input() ability: Ability;
  pokemons: PokemonAbility[];
  urlImage:string = "../../../../assets/images/pokemon/";

  constructor(private _ability:AbilityService) { }

  ngOnInit() {
    this._ability.getPokemonByAbility(this.ability.ability)
     .subscribe((res:any) => {
       this.pokemons = res as PokemonAbility[];
     })
  }
}

interface PokemonAbility {
  ability:string,
  pokemon:string
}
