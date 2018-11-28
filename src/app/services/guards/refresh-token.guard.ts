import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanActivateChild} from '@angular/router';

import { TrainerService } from '../services.index';

@Injectable({
  providedIn: 'root'
})

export class RefreshTokenGuard implements CanActivateChild {

  constructor(private _trainer: TrainerService){}
  canActivateChild(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Promise<boolean> | boolean {

      let token = this._trainer.token;
      if (!token) return false;  // No Token? Denying Acces automatic redirect to Sign In

      let payload = JSON.parse(atob(token.split('.')[1]));  // Decode BASE64
      // Payload.exp = seconds till Token expires
      let expired = this.tokenExpired(payload.exp);  // Token expired?

      if (expired) { // If Expired remove Token to get a New One
        localStorage.removeItem('token');
        sessionStorage.clear();
        return false;
      }
      return this.needRefresh(payload.exp);
  }

  tokenExpired(date:number) {
    let now = new Date().getTime() / 1000;  // Time in seconds
    if (date < now) return true;
    else return false;
  }

  needRefresh(date:number): Promise<boolean> {
    return new Promise ((res, req) => {
       let tokenExpires = new Date (date * 1000);  // Time the Token Expires
       let now = new Date();
       now.setTime(now.getTime() + (0.5 * 60 * 60 * 1000));  // Now + 30 Minutes

       if (tokenExpires.getTime() > now.getTime()){
         res(true);
       } else {  // 30 minutes till Token expires? Refresh Token
         this._trainer.refreshToken()
          .subscribe(() => {
            res(true);
          }, () => {  // If Error
            req(false);
          });
       }
    });
  }

}
