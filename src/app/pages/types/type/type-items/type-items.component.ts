import { Component, OnInit, Input } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon-type.model';
import { PokeItem } from 'src/app/models/poke-item.model';

@Component({
  selector: 'sun-moon-type-items',
  templateUrl: './type-items.component.html',
  styleUrls: ['./type-items.component.scss']
})

export class TypeItemsComponent implements OnInit {

  @Input() type: PokemonType;
  @Input() pokeitems: PokeItem[];
  urlImage: string = "../../../../assets/images/poke-items/";

  constructor() { }

  ngOnInit() {
  }

}
