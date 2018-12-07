import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { AbilityService } from 'src/app/services/services.index';
import { Ability } from 'src/app/models/ability.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ABILITY_PICTURE } from 'src/app/config/data';

@Component({
  selector: 'app-create-ability',
  templateUrl: './create-ability.component.html',
  styleUrls: ['./create-ability.component.scss']
})

export class CreateAbilityComponent implements OnInit {

  ability: Ability;
  abilityForm: FormGroup;
  pictures: any[];
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _ability: AbilityService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.pictures = ABILITY_PICTURE;
    this.createAbilityForm();
  }

  createAbilityForm():void{
    this.abilityForm = new FormGroup({
      name: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      ability: new FormControl(null, [  // Ability
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      picture: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      shards: new FormControl('', [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    if (this.abilityForm.invalid) return false;

    this._ability.createAbility(this.abilityForm.value)
     .subscribe(() => {
       Swal('Great!', 'Ability created!', 'success')
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
