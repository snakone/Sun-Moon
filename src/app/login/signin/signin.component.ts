import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import Swal from 'sweetalert2'

declare function init_plugins();   // Init JQuery Plugins
declare const gapi: any;  // Google API

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SignInComponent implements OnInit {

  remember: boolean = false;
  signInForm: FormGroup;
  disabled: boolean = true;
  auth2: any;

  constructor(private _trainer: TrainerService,
              public router: Router) { }

  ngOnInit() {
  // When coming Straight and from Outside, Init JQuery Plugins -> Loader
    init_plugins();
    this.googleInit();
    this.createSignUpForm();
    this.getRememberedEmail();
  }

  createSignUpForm():void{
    this.signInForm = new FormGroup({
        email: new FormControl(null,[  // EMAIL
                                     Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    password: new FormControl(null, [  // PASSWORD
                                     Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(25)]),
    remember: new FormControl(false, Validators.nullValidator)});
  }

  onSubmit(){
    if (this.signInForm.invalid) return false;
    let trainerSignIn = new Trainer(null,
                            this.signInForm.value.email,
                            this.signInForm.value.password);
    this._trainer.signInTrainer(trainerSignIn, this.signInForm.value.remember)
     .subscribe(res => {
       if (res){
         Swal('Welcome!', res.trainer.name, 'success')
          .then(() => {
            this.router.navigate(['/home']);
          });
        }
     })
  }

  getRememberedEmail():void{
    let email = localStorage.getItem('email') || '';
    if (email.length >= 5)
    this.signInForm.setValue({email: email, password: null, remember: true});
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

  shootGoogleSignIn(element){ // Assign Google Event to the Button Element
    this.auth2.attachClickHandler(element, {}, googleTrainer => {
      // let profile = googleTrainer.getBasicProfile();
      let token = googleTrainer.getAuthResponse().id_token;
      this._trainer.googleSignIn(token)
       .subscribe(res => {
         if (res){
           Swal('Welcome!', 'Google Authentication Successful', 'success')
            .then(() => {
              window.location.href = '/';
            });
          }
       });
    });
  }

}
