import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { PokeItem } from 'src/app/models/poke-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class PokeItemService {

  pokeitems: PokeItem[] = [];
  count: number = 0;
  readonly API_pokeitem = URL_SERVICES + '/poke-items';

  constructor(private http: HttpClient,
              private _trainer: TrainerService) {}


  getPokeItemList(){
    return this.http.get(URL_SERVICES + '/poke-items');
  }

  getPokeItemCount(){  // Home Page
    return this.http.get(URL_SERVICES + '/poke-items')
    .pipe(map((res:any) => {
        return res.pokeitemCount;
    }));
  }

  getPokeItemByName(name:string){
    return this.http.get(URL_SERVICES + '/poke-item-name/' + name)
     .pipe(map((res:any) => {
        return res.pokeitem[0];
     }));
  }

  deletePokeItem(id: string){
    return this.http.delete(URL_SERVICES + `/poke-items/${id}?token=${this._trainer.token}`)
  }

  createPokeItem(pokeitem: PokeItem):Observable<any>{
    return this.http.post(URL_SERVICES + `/poke-items?token=${this._trainer.token}`, pokeitem);
  }

  updatePokeItem(pokeitem: PokeItem){
    return this.http.put(URL_SERVICES +
      `/poke-items/${pokeitem._id}?token=${this._trainer.token}`, pokeitem)
     .pipe(map((data:any)=> {
         return data.pokeitem;
     }));
  }

}
