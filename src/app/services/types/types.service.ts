import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TypesService {

  constructor(private http: HttpClient) { }

  getTypeByName(type:string){
    return this.http.get(URL_SERVICES + '/types/' + type)
    .pipe(map((res:any) => {
      return {
        type: res.type[0],
        single: res.single,
        dual: res.dual,
        moves: res.moves,
        best: res.best,
        pokeitems: res.pokeitems
      }
    }));
  }
}
