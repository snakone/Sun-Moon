import { Component, OnInit, Input } from '@angular/core';
import { PokeItem } from 'src/app/models/poke-item.model';

@Component({
  selector: 'app-search-poke-items',
  templateUrl: './search-poke-items.component.html',
  styleUrls: ['./search-poke-items.component.scss']
})

export class SearchPokeItemComponent implements OnInit {

  @Input() pokeitems: PokeItem[];
  urlImage: string = "../../../../assets/images/poke-items/";

  constructor() { }

  ngOnInit() {
  }

}
