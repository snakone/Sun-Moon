import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability } from 'src/app/models/ability.model';
import { AbilityService } from 'src/app/services/services.index';
import { Location } from '@angular/common';

@Component({
  selector: 'sun-moon-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})

export class AbilityComponent implements OnInit {

  ability: Ability;
  urlImage: string = "../../../../assets/images/abilities/";

  constructor(private activatedRoute: ActivatedRoute,
              private _ability: AbilityService,
              private _location: Location) { }

  ngOnInit() {
    let abilityName = this.activatedRoute.snapshot.params.name;
    this._ability.getAbilityByName(abilityName)
     .subscribe(res => {
       this.ability = res;
     })
  }

  goBack(){
    this._location.back();
  }

}
