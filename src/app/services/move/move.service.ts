import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Move } from 'src/app/models/move.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class MoveService {

  moves: Move[] = [];
  count: number = 0;
  readonly API_move = URL_SERVICES + '/moves';

  constructor(private http: HttpClient,
              private _trainer: TrainerService) {}


  getMoveList(){
    return this.http.get(URL_SERVICES + '/moves');
  }

  getMoveCount(){  // Home Page
    return this.http.get(URL_SERVICES + '/moves')
    .pipe(map((res:any) => {
        return res.moveCount;
    }));
  }

  getMoveByName(name:string){
    return this.http.get(URL_SERVICES + '/move-name/' + name)
     .pipe(map((res:any) => {
        return res.move[0];
     }));
  }

  deleteMove(id: string){
    return this.http.delete(URL_SERVICES + `/moves/${id}?token=${this._trainer.token}`)
  }

  createMove(move: Move):Observable<any>{
    return this.http.post(URL_SERVICES + `/moves?token=${this._trainer.token}`, move);
  }

  updateMove(move: Move){
    return this.http.put(URL_SERVICES +
      `/moves/${move._id}?token=${this._trainer.token}`, move)
     .pipe(map((data:any)=> {
         return data.move;
     }));
  }

}
