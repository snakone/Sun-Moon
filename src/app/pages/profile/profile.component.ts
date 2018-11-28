import { Component, OnInit } from '@angular/core';
import { TrainerService} from 'src/app/services/services.index';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  trainer: Trainer;
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor(public _trainer: TrainerService) { }

  ngOnInit() {
    this.trainer = this._trainer.trainer;
  }

}
