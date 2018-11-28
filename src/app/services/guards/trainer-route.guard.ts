import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TrainerService } from '../trainer/trainer.service';

@Injectable({
  providedIn: 'root'
})

export class TrainerRouteGuard implements CanActivate {

  constructor(private _trainer: TrainerService,
              private router: Router) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if (this._trainer.areYouOnline()){
      return true;
    }
      console.log("Blocked by Arceus the Pokémon God!");
      this.router.navigate(['/signin']);
      return false;
  }
}
