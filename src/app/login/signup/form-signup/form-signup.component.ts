import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { map, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'pocketown-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss']
})

export class FormSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;
  matchError: boolean;  // Password Match

  constructor(private _trainer: TrainerService,
              private router: Router) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm():void{
    this.signUpForm = new FormGroup({
      name: new FormControl(null, { asyncValidators: [ // Bind to Form Control
                                    this.validateNameNotTaken.bind(this)], updateOn: 'blur',
                                    validators: [  // NAME
                                                 Validators.required,
                                                 Validators.minLength(3),
                                                 Validators.maxLength(15),
                                                 Validators.pattern(this.namePattern)]}),
      email: new FormControl(null,[  // EMAIL
                                   Validators.required,
                                   Validators.email,
                                   Validators.minLength(5),
                                   Validators.maxLength(35)]),
      password: new FormControl(null, [  // PASSWORD
                                   Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
      passwordMatch: new FormControl('', [  // MATCH
                                   Validators.required,
                                   Validators.minLength(5),
                                   Validators.maxLength(25)]),
      conditions: new FormControl(false, Validators.requiredTrue)  // CONDITIONS
    }, { validators: this.theyMatchError('password', 'passwordMatch')});
  }

  onSubmit(){
    if (this.signUpForm.invalid) return false;
    let newTrainer = new Trainer(
      this.signUpForm.value.name,
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );

    this._trainer.createTrainer(newTrainer)
     .subscribe(() => {
       Swal('Congratulations!', 'Trainer Profile Created!', 'success')
        .then(() => {
           this.router.navigate(['/signin']);
        })
     });
  }

  theyMatchError(one: string, two: string){
    return (group: FormGroup) => {
      let password = group.controls[one].value;
      let passwordMatch = group.controls[two].value;
      if (password === passwordMatch) {
        this.matchError = false;
        return null;  // Null = NO ERROR
      }
      this.matchError = true;
      return {
        theyMatch : true
      };
    }
  }

  validateNameNotTaken(control: AbstractControl) {
   return this._trainer.getTrainerByName(control.value)
   .pipe(map(res => {  // Null = NO ERROR
     return res ? { nameTaken: true } : null;
   }), debounceTime(1500));
 }

}
