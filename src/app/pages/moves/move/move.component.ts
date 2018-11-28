import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Move } from 'src/app/models/move.model';
import { MoveService } from 'src/app/services/services.index';
import { Location } from '@angular/common';

@Component({
  selector: 'sun-moon-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})

export class MoveComponent implements OnInit {

  move: Move;

  constructor(private activatedRoute: ActivatedRoute,
              private _move: MoveService,
              private _location: Location) { }

  ngOnInit() {
    let moveName = this.activatedRoute.snapshot.params.name;
    this._move.getMoveByName(moveName)
     .subscribe(res => {
       this.move = res;
     })
  }

  goBack(){
    this._location.back();
  }

}
