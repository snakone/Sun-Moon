import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';  // Material Dialog
import { Inject } from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.scss']
})

export class EditTrainerComponent implements OnInit {

  trainer:Trainer;

  constructor(private _trainer: TrainerService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.trainer = this.data;
  }

  updateTrainer(){
    this._trainer.updateTrainer(this.trainer)  // NgModel
     .subscribe(() => {
       Swal('Alright', 'Trainer Updated', 'info')
        .then(()=> {
          this.dialog.closeAll();
        })
     });
  }

}
