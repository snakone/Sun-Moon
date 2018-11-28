import { Component, OnInit } from '@angular/core';
import { PokeItem } from 'src/app/models/poke-item.model';
import { PokeItemService } from 'src/app/services/services.index';

import Swal from 'sweetalert2'

import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { CreatePokeItemComponent } from 'src/app/components/modals/create-poke-item/create-poke-item.component';
import { EditPokeItemComponent } from 'src/app/components/modals/edit-poke-item/edit-poke-item.component';

@Component({
  selector: 'app-poke-items',
  templateUrl: './admin-poke-item.component.html',
  styleUrls: ['./admin-poke-item.component.scss']
})

export class AdminPokeItemComponent implements OnInit {

  constructor(private _pokeitem: PokeItemService,
              public dialog: MatDialog) { }

  pokeitems: PokeItem[] = [];
  filteredPokeItems: PokeItem[] = [];
  totalPokeItems: number = 0;
  searchValue: string;

  ngOnInit() {
    this.getPokeItems();
  }

  getPokeItems(){
      this._pokeitem.getPokeItemList()
       .subscribe((res:any) => {
         this.pokeitems = res.pokeitems;
         this.filteredPokeItems = this.pokeitems;
         this.totalPokeItems = res.pokeitemCount;
       });
  }

  editPokeItem(pokeitem:PokeItem){
    const dialogRef = this.dialog.open(EditPokeItemComponent,{data:pokeitem});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokeItems();
        }, 1500)
      }  // End of If (result)
    });
  }

  openPokeItemDialog(){
    const dialogRef = this.dialog.open(CreatePokeItemComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokeItems();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(pokeitem:PokeItem){
    let data = {
      _id: pokeitem._id,
      collection: 'PokeItem'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokeItems();
        }, 1500)
      }  // End of If (result)
    });
  }

  deletePokeItem(pokeitem:PokeItem){
     Swal({
       title: "¿Are You sure?",
       text: `You are about to delete ${pokeitem.item}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
       })
      .then(res => {
        if (res.value){
          this._pokeitem.deletePokeItem(pokeitem._id)
           .subscribe(() => {
             Swal('Alright!', 'Held Item Deleted', 'info');
             this.getPokeItems();
           });
        }
      });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokeItembySearch();  // Filter PokeItem
  }

  filterPokeItembySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredPokeItems = this.pokeitems.filter(pokeitem => {  // Filter Array
       // ngModel on Input Text - Search Value
       return pokeitem.item.match(filter);  // Filter Original List into Filtered List
     } );
   }


}
