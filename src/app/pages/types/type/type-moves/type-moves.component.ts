import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'sun-moon-type-moves',
  templateUrl: './type-moves.component.html',
  styleUrls: ['./type-moves.component.scss']
})

export class TypeMovesComponent implements OnInit {

  @Input() type: PokemonType;
  @Input() moves: Move[];

  constructor() { }

  ngOnInit() {
  }

}
