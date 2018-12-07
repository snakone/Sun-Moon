import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'sun-moon-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TypeDetailsComponent implements OnInit {

  @Input() type: PokemonType;
  @Input() single: number;
  @Input() dual: number;
  @Input() total: number;
  @Input() moves: number;

  constructor() { }

  ngOnInit() {
  }

}
