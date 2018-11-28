import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TrainerService } from '../trainer/trainer.service';
import Swal from 'sweetalert2'

declare function close_preloader();   // Init JQuery Plugins

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private _trainer: TrainerService,
              private router: Router){
                close_preloader();
              }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {

    if (this._trainer.trainer.role === 'ADMIN_ROLE') return true;
    else {
      console.log("Blocked by Arceus the Pokémon God!");
      Swal('Error', 'You don\'t have rights to access here!', 'error')
       .then(()=> {
         this.router.navigate(['/home']);
         return false;
       });
    }
  }
}
