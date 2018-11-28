import { Component, OnInit} from '@angular/core';
import { PokeItemService } from 'src/app/services/services.index';

import { MatDialog } from '@angular/material';  // Material Dialog
import { PokeItem } from 'src/app/models/poke-item.model';

@Component({
  selector: 'sun-moon-pokeitems',
  templateUrl: './poke-items.component.html',
  styleUrls: ['./poke-items.component.scss']
})

export class PokeItemsComponent implements OnInit {

  pokeitems: PokeItem[] = [];
  filteredPokeItems: PokeItem[] = [];  // Filtered PokeItems
  urlImage: string = "../../../assets/images/poke-items/";
  searchValue: string = "";
  count: number = 0;

  constructor(private _pokeitems: PokeItemService,
              public dialog: MatDialog) { }

  ngOnInit() {
    if (this._pokeitems.pokeitems.length == 0){  // No PokeItems? Get from Server
      setTimeout(()=> {
          this.getPokeItems();  // Virtual Scroll??
      }, 500);
    } else {  // Get from Service
      this.pokeitems = this._pokeitems.pokeitems;
      this.filteredPokeItems = this.pokeitems;
      this.count = this._pokeitems.count;
    }
  }

  getPokeItems(){
    this._pokeitems.getPokeItemList()
     .subscribe((res:any) => {
       this.pokeitems = res.pokeitems;
       this._pokeitems.pokeitems = this.pokeitems;
       this.filteredPokeItems = this.pokeitems;  // Filtered List
       this.count = res.pokeitemCount;
       this._pokeitems.count = this.count;
     })
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokeItembySearch();  // Filter PokeItem
  }

  filterPokeItembySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredPokeItems = this.pokeitems.filter(pokeitem => {  // Filter Array
       // ngModel on Input Text - Search Value
       return pokeitem.item.match(filter);  // Filter Original List
     } );
   }

}
