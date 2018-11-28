import { Injectable } from '@angular/core';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

    menu: any[]=[];

  constructor(private _trainer: TrainerService) {}

   loadMenu(){
    this.menu = this._trainer.menu;
   }
}
