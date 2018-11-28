import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})

export class SearchPokemonComponent implements OnInit {

  @Input() pokemons: Pokemon[];
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor() { }

  ngOnInit() {
  }

}
