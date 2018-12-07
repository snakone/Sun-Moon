import { Component, OnInit } from '@angular/core';
import { Ability } from 'src/app/models/ability.model';
import { AbilityService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { CreateAbilityComponent } from 'src/app/components/modals/create-ability/create-ability.component';
import { EditAbilityComponent } from 'src/app/components/modals/edit-ability/edit-ability.component';

@Component({
  selector: 'app-abilities',
  templateUrl: './admin-ability.component.html',
  styleUrls: ['./admin-ability.component.scss']
})

export class AdminAbilityComponent implements OnInit {

  constructor(private _ability: AbilityService,
              public dialog: MatDialog) { }

  abilities: Ability[] = [];
  filteredAbilities: Ability[] = [];
  totalAbilities: number = 0;
  options: ScrollToOptions;
  searchValue: string;

  ngOnInit() {
    this.getAbilities();
  }

  getAbilities(){
      this._ability.getAbilityList()
       .subscribe((res:any) => {
         this.abilities = res.abilities;
         this.filteredAbilities = this.abilities;
         this.totalAbilities = res.abilityCount;
       });
  }

  editAbility(ability:Ability){
    const dialogRef = this.dialog.open(EditAbilityComponent,{data:ability});  // New Dialog
    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getAbilities();
        }, 1500)
      }  // End of If (result)
    });
  }

  openAbilityDialog(){
    const dialogRef = this.dialog.open(CreateAbilityComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getAbilities();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(ability:Ability){
    let data = {
      _id: ability._id,
      collection: 'Ability'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getAbilities();
        }, 1500)
      }  // End of If (result)
    });
  }

  deleteAbility(ability:Ability){
     Swal({
       title: "¿Are You sure?",
       text: `You are about to delete ${ability.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
       })
      .then(res => {
        if (res.value){
          this._ability.deleteAbility(ability._id)
           .subscribe(() => {
             Swal('Alright!', 'Ability Deleted', 'info');
             this.getAbilities();
           });
        }
      });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterAbilitybySearch();  // Filter Ability
  }

  filterAbilitybySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredAbilities = this.abilities.filter(ability => {  // Filter Array
       // ngModel on Input Text - Search Value
       return ability.name.match(filter);  // Filter Original List into Filtered List
     } );
   }


}
