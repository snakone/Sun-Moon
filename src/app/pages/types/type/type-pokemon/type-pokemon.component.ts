import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'sun-moon-type-pokemon',
  templateUrl: './type-pokemon.component.html',
  styleUrls: ['./type-pokemon.component.scss']
})

export class TypePokemonComponent implements OnInit {

  @Input() type: PokemonType;
  @Input() single: Pokemon[];
  @Input() dual: Pokemon[];
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor() { }

  ngOnInit() {
  }

}
