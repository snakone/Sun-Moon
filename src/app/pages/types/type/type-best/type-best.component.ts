import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-type-best',
  templateUrl: './type-best.component.html',
  styleUrls: ['./type-best.component.scss']
})

export class TypeBestComponent implements OnInit {

  @Input() best: Pokemon[];

  constructor() { }

  ngOnInit() {
  }

}
