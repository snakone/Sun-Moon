import { Component, OnInit} from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { EditTrainerComponent } from 'src/app/components/modals/edit-trainer/edit-trainer.component';

@Component({
  selector: 'app-trainers',
  templateUrl: './admin-trainers.component.html',
  styleUrls: ['./admin-trainers.component.scss']
})

export class AdminTrainersComponent implements OnInit {

  constructor(private _trainer: TrainerService,
              public dialog: MatDialog) { }

  trainers: Trainer[] = [];
  filteredTrainers: Trainer[] = [];
  searchValue: string;
  totalTrainers: number = 0;
  options: ScrollToOptions;

  ngOnInit() {
    this.getTrainers();
  }

  getTrainers(){
      this._trainer.getTrainerList()
       .subscribe((res:any) => {
         this.trainers = res.trainers;
         this.filteredTrainers = this.trainers;
         this.totalTrainers = res.trainerCount;
       });
  }

  editTrainer(trainer:Trainer){
  this.dialog.open(EditTrainerComponent,{data:trainer});  // New Dialog
  }

  openImageDialog(trainer:Trainer){
    let data = {
      _id: trainer._id,
      collection: 'Trainer'
    }

    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
      setTimeout(() => {   // Wait a bit to get Updated Data Again
         this.getTrainers();
      }, 1500)
      }  // End of If (result)
    });
  }

  deleteTrainer(trainer:Trainer){
    if (trainer._id == this._trainer.trainer._id){
       Swal('Error', 'You cannot delete Yourself!', 'error');
       return false;
    }

    if (trainer.role == 'ADMIN_ROLE'){
       Swal('Error', 'You cannot delete an Admin!', 'error');
       return false;
    }

     Swal({
       title: "¿Are You sure?",
       text: `You are about to delete Trainer ${trainer.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
       })
      .then(res => {
        if (res.value){
          this._trainer.deleteTrainer(trainer._id)
           .subscribe(() => {
             Swal('Alright', 'Trainer Deleted', 'info');
             this.getTrainers();
           });
        }
      });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokemonbySearch();  // Filter Pokemon
  }

  filterPokemonbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredTrainers = this.trainers.filter(pokemon => {  // Filter Array
       // ngModel on Input Text - Search Value
       return pokemon.name.match(filter);  // Filter Original List into Filtered List
     } );
   }

}
