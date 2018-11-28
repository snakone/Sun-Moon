import { Component, OnInit, Input} from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {

  @Input() pokemons: Pokemon[] = [];
  @Input() selection: any = {};
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor() { }

  ngOnInit() {
  }

}
