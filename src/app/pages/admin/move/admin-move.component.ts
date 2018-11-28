import { Component, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { MoveService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { CreateMoveComponent } from 'src/app/components/modals/create-move/create-move.component';
import { EditMoveComponent } from 'src/app/components/modals/edit-move/edit-move.component';

@Component({
  selector: 'app-moves',
  templateUrl: './admin-move.component.html',
  styleUrls: ['./admin-move.component.scss']
})

export class AdminMoveComponent implements OnInit {

  constructor(private _move: MoveService,
              public dialog: MatDialog) { }

  moves: Move[] = [];
  filteredMoves: Move[] = [];
  totalMoves: number = 0;
  options: ScrollToOptions;
  searchValue: string;

  ngOnInit() {
    this.getMoves();
  }

  getMoves(){
      this._move.getMoveList()
       .subscribe((res:any) => {
         this.moves = res.moves;
         this.filteredMoves = this.moves;
         this.totalMoves = res.moveCount;
       });
  }

  editMove(move:Move){
    const dialogRef = this.dialog.open(EditMoveComponent,{data:move});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getMoves();
        }, 1500)
      }  // End of If (result)
    });
  }

  openMoveDialog(){
    const dialogRef = this.dialog.open(CreateMoveComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getMoves();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(move:Move){
    let data = {
      _id: move._id,
      collection: 'Move'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getMoves();
        }, 1500)
      }  // End of If (result)
    });
  }

  deleteMove(move:Move){
     Swal({
       title: "¿Are You sure?",
       text: `You are about to delete ${move.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
       })
      .then(res => {
        if (res.value){
          this._move.deleteMove(move._id)
           .subscribe(() => {
             Swal('Alright!', 'Move Deleted', 'info');
             this.getMoves();
           });
        }
      });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterMovebySearch();  // Filter Move
  }

  filterMovebySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredMoves = this.moves.filter(move => {  // Filter Array
       // ngModel on Input Text - Search Value
       return move.name.match(filter);  // Filter Original List into Filtered List
     } );
   }


}
