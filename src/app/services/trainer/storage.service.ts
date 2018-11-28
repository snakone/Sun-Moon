import { Injectable } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private router:Router) { }

  save(id: string, token: string, trainer: Trainer, menu: any):void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('trainer', JSON.stringify(trainer));  // JSON to String
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  remove(){
    localStorage.removeItem('trainer');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/signin']);
  }
}
