import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/services.index';
import { Location } from '@angular/common';

@Component({
  selector: 'sun-moon-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})

export class TrainerComponent implements OnInit {

  trainer: Trainer;
  urlImage: string = "../../../../assets/images/pokemon/"

  constructor(private activatedRoute: ActivatedRoute,
              private _trainer: TrainerService,
              private _location: Location) { }

  ngOnInit() {
    let trainerName = this.activatedRoute.snapshot.params.name;  // Get name from URL
    this._trainer.getTrainerByName(trainerName)
     .subscribe(res => {
       this.trainer = res as Trainer;
     })
  }

  goBack(){
    this._location.back();
  }

}
