import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Ability } from 'src/app/models/ability.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class AbilityService {

  abilities: Ability[] = [];
  count: number = 0;
  readonly API_ability = URL_SERVICES + '/abilities';

  constructor(private http: HttpClient,
              private _trainer: TrainerService) {}


  getAbilityList(){
    return this.http.get(URL_SERVICES + '/abilities');
  }

  getAbilityByName(name:string){
    return this.http.get(URL_SERVICES + '/ability-name/' + name)
     .pipe(map((res:any) => {
        return res.ability[0];
     }));
  }

  getPokemonByAbility(ability:string){
    return this.http.get(URL_SERVICES + '/pokemon-ability/' + ability)
    .pipe(map((res:any) => {
       return res.pokemon;
    }));
  }

  deleteAbility(id: string){
    return this.http.delete(URL_SERVICES + `/abilities/${id}?token=${this._trainer.token}`)
  }

  createAbility(ability: Ability):Observable<any>{
    return this.http.post(URL_SERVICES + `/abilities?token=${this._trainer.token}`, ability);
  }

  updateAbility(ability: Ability){
    return this.http.put(URL_SERVICES +
      `/abilities/${ability._id}?token=${this._trainer.token}`, ability)
     .pipe(map((data:any)=> {
         return data.ability;
     }));
  }

}
