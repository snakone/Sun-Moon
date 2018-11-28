import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Trainer } from 'src/app/models/trainer.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Move } from 'src/app/models/move.model';
import { PokeItem } from 'src/app/models/poke-item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  trainers: Trainer[] =[];
  pokemons: Pokemon[] = [];
  moves: Move[] = [];
  pokeitems: PokeItem[] = [];
  urlImage: string = "../../../assets/images/icon/"

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params  // Subscribe to URL changes
     .subscribe(params => {
       this.searchValue(params['value']);
     });
  }

  searchValue(value: string){
    this.http.get(URL_SERVICES + '/search/all/' + value)
     .subscribe((res:any) => {
       this.trainers = res.trainers;
       this.pokemons = res.pokemons;
       this.moves = res.moves;
       this.pokeitems = res.pokeitems;
     })
  }

}
