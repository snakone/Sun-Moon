import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { AbilityService } from 'src/app/services/services.index';
import { Ability } from 'src/app/models/ability.model';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ABILITY_PICTURE } from 'src/app/config/data';

@Component({
  selector: 'app-edit-ability',
  templateUrl: './edit-ability.component.html',
  styleUrls: ['./edit-ability.component.scss']
})

export class EditAbilityComponent implements OnInit {

  ability: Ability;
  pictures: any[];
  abilityForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9-][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _ability: AbilityService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.pictures = ABILITY_PICTURE;
    this.ability = this.data;
    this.editAbilityForm();
  }

  editAbilityForm():void{
    this.abilityForm = new FormGroup({
      _id: new FormControl(this.ability._id),
      name: new FormControl(this.ability.name, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      ability: new FormControl(this.ability.ability, [  // Ability
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      picture: new FormControl(this.ability.picture, [Validators.required]),
      type: new FormControl(this.ability.type, [Validators.required]),
      grade: new FormControl(this.ability.grade, [Validators.required]),
      shards: new FormControl(this.ability.shards, [Validators.required]),
      info: new FormControl(this.ability.info, [Validators.required])
    });
  }

  updateAbility():void {
    if (this.abilityForm.invalid) return;
    this._ability.updateAbility(this.abilityForm.value)
     .subscribe(() => {
       Swal('Alright!', 'Ability Updated', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
