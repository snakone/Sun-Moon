import { Component, OnInit} from '@angular/core';
import { TrainerService } from 'src/app/services/services.index';
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})

export class AccountSettingsComponent implements OnInit {

  trainer: Trainer;

  constructor(private _trainer: TrainerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.trainer = this._trainer.trainer;
  }

  openDialog(){
    let data = {
      _id: this.trainer._id,
      collection: 'Trainer'
    }
    this.dialog.open(EditPictureComponent,{data:data});  // New Dialog
  }

}
