import { Component, OnInit, Input } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'sun-moon-type-features',
  templateUrl: './type-features.component.html',
  styleUrls: ['./type-features.component.scss']
})

export class TypeFeaturesComponent implements OnInit {

  @Input() type: PokemonType;

  constructor() { }

  ngOnInit() {
  }

}
