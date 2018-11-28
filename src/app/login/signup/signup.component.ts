import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'

declare const gapi: any;  // Google API

declare function init_plugins();   // Init JQuery Plugins

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {

  auth2: any;

  constructor(private _trainer: TrainerService) { }

  ngOnInit() {
    // When coming Straight and from Outside, Init JQuery Plugins -> Loader
    init_plugins();
    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '821401232099-u2oo8vjhjm977srfir4aqlgn2gfu0rkg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this._trainer.auth2 = this.auth2;
      this.shootGoogleSignIn(document.getElementById("google"));
    });
  }

  shootGoogleSignIn(element){  // Assign Google Event to the Button Element
    this.auth2.attachClickHandler(element, {}, googleTrainer => {
      let token = googleTrainer.getAuthResponse().id_token;
      this._trainer.googleSignIn(token)
       .subscribe(res => {
         if (res){
           Swal('Welcome!', 'Google Authentication Successful', 'success')
            .then(() => {
              window.location.href = '/home';
            });
          }
       });
    });
  }

}
