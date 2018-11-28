import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { MoveService } from 'src/app/services/services.index';
import { Move } from 'src/app/models/move.model';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-edit-move',
  templateUrl: './edit-move.component.html',
  styleUrls: ['./edit-move.component.scss']
})

export class EditMoveComponent implements OnInit {

  move: Move;
  types: string[];
  moveForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9-][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _move: MoveService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.types = TYPES;
    this.move = this.data;
    this.editMoveForm();
  }

  editMoveForm():void{
    this.moveForm = new FormGroup({
      _id: new FormControl(this.move._id),
      name: new FormControl(this.move.name, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      z: new FormControl(this.move.z, [Validators.required]),
      power: new FormControl(this.move.power, [Validators.required]),
      hit: new FormControl(this.move.hit, [Validators.required]),
      pp: new FormControl(this.move.pp, [Validators.required]),
      type: new FormControl(this.move.type, [Validators.required]),
      attack: new FormControl(this.move.attack, [Validators.required]),
      info: new FormControl(this.move.info)
    });
  }

  updateMove():void {
    if (this.moveForm.invalid) return;
    this._move.updateMove(this.moveForm.value)
     .subscribe(() => {
       Swal('Alright!', 'Move Updated', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
