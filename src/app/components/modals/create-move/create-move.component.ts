import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { MoveService } from 'src/app/services/services.index';
import { Move } from 'src/app/models/move.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-create-move',
  templateUrl: './create-move.component.html',
  styleUrls: ['./create-move.component.scss']
})

export class CreateMoveComponent implements OnInit {

  move: Move;
  moveForm: FormGroup;
  types: string[];
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _move: MoveService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.types = TYPES;
    this.createMoveForm();
  }

  createMoveForm():void{
    this.moveForm = new FormGroup({
      name: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      z: new FormControl(null, [Validators.required]),
      power: new FormControl(null, [Validators.required]),
      hit: new FormControl(null, [Validators.required]),
      pp: new FormControl(null, [Validators.required]),
      type: new FormControl('', [Validators.required]),
      attack: new FormControl('', [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    if (this.moveForm.invalid) return false;

    this._move.createMove(this.moveForm.value)
     .subscribe(() => {
       Swal('Great!', 'Move created!', 'success')
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
