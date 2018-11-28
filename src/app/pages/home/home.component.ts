import { Component, OnInit } from '@angular/core';
import { PokedexService, MoveService, PokeItemService } from 'src/app/services/services.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  pokemonCount: number = 0;
  moveCount: number = 0;
  pokeItemCount: number = 0;
  year: number;
  urlImage: string = "../../../assets/images/icon/";

  constructor(private _pokedex: PokedexService,
              private _move: MoveService,
              private _pokeitem: PokeItemService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    let sideBar = document.body.classList;

    if (sideBar.contains("show-sidebar")) {
      sideBar.remove("show-sidebar");
      return false;
    }

    this._pokedex.getPokemonCount()
     .subscribe(res => {
       this.pokemonCount = res as number;
     });

    this._move.getMoveCount()
     .subscribe(res => {
       this.moveCount = res as number;
     });

    this._pokeitem.getPokeItemCount()
     .subscribe(res => {
       this.pokeItemCount = res as number;
     })
  }

}
