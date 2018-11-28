import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { PokeItemService } from 'src/app/services/services.index';
import { PokeItem } from 'src/app/models/poke-item.model';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-edit-poke-item',
  templateUrl: './edit-poke-item.component.html',
  styleUrls: ['./edit-poke-item.component.scss']
})

export class EditPokeItemComponent implements OnInit {

  pokeitem: PokeItem;
  types: string[];
  pokeitemForm: FormGroup;
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _pokeitem: PokeItemService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.types = TYPES;
    this.types.push("Battle");  // Push Type Battle only on Poke Items
    this.pokeitem = this.data;
    this.editPokeItemForm();
  }

  editPokeItemForm():void{
    this.pokeitemForm = new FormGroup({
      _id: new FormControl(this.pokeitem._id),
      item: new FormControl(this.pokeitem.item, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      picture: new FormControl(this.pokeitem.picture, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      grade: new FormControl(this.pokeitem.grade, [Validators.required]),
      type: new FormControl(this.pokeitem.type, [Validators.required]),
      info: new FormControl(this.pokeitem.info)
    });
  }

  updatePokeItem():void {
    if (this.pokeitemForm.invalid) return;
    this._pokeitem.updatePokeItem(this.pokeitemForm.value)
     .subscribe(() => {
       Swal('Alright!', 'Held Item Updated', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
