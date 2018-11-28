import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/models/pokemon.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokedexService {

  pokedex: Pokemon[] = [];
  count: number = 0;

  constructor(private http: HttpClient) { }

  getPokedex(){
    return this.http.get(URL_SERVICES + '/pokedex');
  }

  getPokemonCount(){  // Home Page
    return this.http.get(URL_SERVICES + '/pokedex')
    .pipe(map((res:any) => {
      return res.pokemonCount;
    }))
  }
}
