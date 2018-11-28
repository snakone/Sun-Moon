import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'app-search-moves',
  templateUrl: './search-moves.component.html',
  styleUrls: ['./search-moves.component.scss']
})

export class SearchMovesComponent implements OnInit {

  @Input() moves: Move[];

  constructor() { }

  ngOnInit() {
  }

}
