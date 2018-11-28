import { Component, OnInit} from '@angular/core';
import { PokedexService } from 'src/app/services/services.index';

import { MatDialog } from '@angular/material';  // Material Dialog
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit {

  pokedex: Pokemon[] = [];
  filteredPokedex: Pokemon[] = [];  // Filtered Pokedex
  urlImage: string = "../../../assets/images/pokemon/";
  searchValue: string = "";
  count: number = 0;

  constructor(private _pokedex: PokedexService,
              public dialog: MatDialog) { }

  ngOnInit() {
    if (this._pokedex.pokedex.length == 0){  // No Pokédex? Get from Server
      setTimeout(()=> {
          this.getPokedex();  // Virtual Scroll??
      }, 600);
    } else {  // Get from Service
      this.pokedex = this._pokedex.pokedex;
      this.filteredPokedex = this.pokedex;
      this.count = this._pokedex.count;
    }
  }

  getPokedex(){
    this._pokedex.getPokedex()
     .subscribe((res:any) => {
       this.pokedex = res.pokemon;
       this._pokedex.pokedex = this.pokedex;
       this.filteredPokedex = this.pokedex;  // Filtered List
       this.count = res.pokemonCount;
       this._pokedex.count = this.count;
     })
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokemonbySearch();  // Filter Pokemon
  }

  filterPokemonbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredPokedex = this.pokedex.filter(pokemon => {  // Filter Array
       // ngModel on Input Text - Search Value
       return pokemon.name.match(filter);  // Filter Original List
     } );
   }

}
