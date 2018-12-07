import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TypeStatsService } from 'src/app/services/services.index';
import { TypeStats } from 'src/app/models/type-stats.model';

@Component({
  selector: 'sun-moon-team-types',
  templateUrl: './team-types.component.html',
  styleUrls: ['./team-types.component.scss']
})

export class TeamTypesComponent implements OnInit, OnChanges {

  @Input() trainer: Trainer;
  teamTypes1: any[] = [];
  teamTypes2: any[] = [];
  types1: TypeStats;  // Array (strong, weak, half, effective)
  types2: TypeStats;
  teamTypes: TypeStats;  // types1 + types2

  constructor(private _types:TypeStatsService) { }

  ngOnChanges(changes: SimpleChanges){  // Subcribe to Trainer Team Changes
    // Cleaner
    this.teamTypes1 = this.getTeamTypes1(changes.trainer.currentValue.team);
    this.teamTypes2 = this.getTeamTypes2(changes.trainer.currentValue.team);
    // Maker
    this.types1 = this._types.getTypes(this.teamTypes1);
    this.types2 = this._types.getTypes(this.teamTypes2);
    // Remove Wrong Types Combination - EX. Fighting doesn't affect Normal/Flying
    this.teamTypes = this._types.removeOddTypes(this.types1, this.types2);
  }

  ngOnInit() {
  }

  getTeamTypes1(team:Pokemon[]){
    let types = [];

    for (let i in team){  // Push Team Types into Array
      types.push(team[i].type);
    }

    let uniqueTypes = Array.from(new Set(types))  // Remove duplciate Types
    let cleanTypes = uniqueTypes.filter(type =>  type != "" );  // Remove Empty Types

    return cleanTypes;
  }

  getTeamTypes2(team:Pokemon[]){
    let types = [];

    for (let i in team){  // Push Team Types into Array
      types.push(team[i].type2);
    }

    let uniqueTypes = Array.from(new Set(types))  // Remove duplciate Types
    let cleanTypes = uniqueTypes.filter(type =>  type != "" ); // Remove Empty Types

    return cleanTypes;
  }

}
