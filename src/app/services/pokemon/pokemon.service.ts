import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  pokemon: Pokemon;  // Pokemon from Mongo, ID -> _id
  pokemonList: Pokemon[] = [];
  readonly API_pokemon = URL_SERVICES + '/pokemons';

  constructor(private http: HttpClient,
              private _trainer: TrainerService) {}


  getPokemonList(){
    return this.http.get(URL_SERVICES + '/pokemons');
  }

  getPokemonByName(name:string){
    return this.http.get(URL_SERVICES + '/pokemon-name/' + name)
     .pipe(map((res:any) => {
        return {
            pokemon: res.pokemon[0],
            familiars: res.familiars,
            next: res.nextPokemon[0].picture,
            previous: res.previousPokemon[0].picture
        };
     }));
  }

  deletePokemon(id: string){
    return this.http.delete(URL_SERVICES + `/pokemons/${id}?token=${this._trainer.token}`)
  }

  createPokemon(pokemon: Pokemon):Observable<any>{
    return this.http.post(URL_SERVICES + `/pokemons?token=${this._trainer.token}`, pokemon);
  }

  updatePokemon(pokemon: Pokemon){
    return this.http.put(URL_SERVICES + `/pokemons/${pokemon._id}?token=${this._trainer.token}`, pokemon)
     .pipe(map((data:any)=> {
         return data.pokemon;
     }));
  }

  filterPokemon(type:string, stat:string, evolution:string){
    if (type === "Any") type = ".*?";
    if (stat === "S.ATK") stat = "SATK";  // Match MongoDB property
    if (stat === "S.DEF") stat = "SDEF";  // Match MongoDB property
    if (stat === "Any") stat = "pokedex";
    if (evolution === "Any") evolution = ".*?";
    const params = {type: type, stat: stat, evolution: evolution};
    return this.http.get(URL_SERVICES + '/laboratory', {params: params} );
  }

}
