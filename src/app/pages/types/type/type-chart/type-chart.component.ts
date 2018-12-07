import { Component, OnInit, Input } from '@angular/core';
import { TypeStats } from 'src/app/models/type-stats.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'sun-moon-type-chart',
  templateUrl: './type-chart.component.html',
  styleUrls: ['./type-chart.component.scss']
})

export class TypeChartComponent implements OnInit {

  @Input() type: PokemonType;
  @Input() chart: TypeStats;

  constructor() { }

  ngOnInit() {
  }

}
