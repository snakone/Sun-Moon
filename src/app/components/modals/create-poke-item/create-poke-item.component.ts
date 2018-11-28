import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';  // Material Dialog
import { PokeItemService } from 'src/app/services/services.index';
import { PokeItem } from 'src/app/models/poke-item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { TYPES } from 'src/app/config/data';

@Component({
  selector: 'app-create-poke-item',
  templateUrl: './create-poke-item.component.html',
  styleUrls: ['./create-poke-item.component.scss']
})

export class CreatePokeItemComponent implements OnInit {

  pokeitem: PokeItem;
  pokeitemForm: FormGroup;
  types: string[];
  namePattern = '^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$';
  disabled: boolean = true;

  constructor(private _pokeitem: PokeItemService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.types = TYPES;
    this.types.push("Battle");  // Push Type Battle only on Poke Items
    this.createPokeItemForm();
  }

  createPokeItemForm():void{
    this.pokeitemForm = new FormGroup({
      item: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      picture: new FormControl(null, [  // NAME
                                   Validators.required,
                                   Validators.minLength(3),
                                   Validators.maxLength(30),
                                   Validators.pattern(this.namePattern)]),
      grade: new FormControl('', [Validators.required]),

      type: new FormControl('', [Validators.required]),
      info: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    if (this.pokeitemForm.invalid) return false;

    this._pokeitem.createPokeItem(this.pokeitemForm.value)
     .subscribe(() => {
       Swal('Great!', 'Held Item created!', 'success')
     });
  }

  closeModal():void {
    this.dialog.closeAll();
  }

}
