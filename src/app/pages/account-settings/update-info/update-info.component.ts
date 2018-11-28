import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {

  trainer: Trainer;
  updateForm: FormGroup;
  disabled: boolean;
  clean: boolean;
  areYouFromGoogle: boolean;

  constructor(public _trainer: TrainerService) { }

  ngOnInit() {
    this.areYouFromGoogle = this._trainer.trainer.google;
    this.trainer = this._trainer.trainer;
    this.createSignUpForm();
  }

  createSignUpForm():void {
    this.updateForm = new FormGroup({
        name: new FormControl(this.trainer.name, [  // NAME
                                     Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(20)]),
        email: new FormControl({value: this.trainer.email, disabled: this.areYouFromGoogle}, [  // EMAIL
                                     Validators.required,
                                     Validators.email,
                                     Validators.minLength(5),
                                     Validators.maxLength(35)]),
    });
  }

  onSubmitProfile(){
    if (!this.trainer.google){
      this.trainer.email = this.updateForm.value.email;
    }

    this.trainer.name = this.updateForm.value.name;

    this._trainer.updateTrainer(this.trainer)
     .subscribe(res => {
       this._trainer.trainer.name = res.name;
         Swal('Alright!', 'Trainer Updated', 'success')
     });
  }

  resetForm(){
    if (this.trainer.google){
      this.updateForm.controls['name'].reset();
    } else this.updateForm.reset();

  }

}
