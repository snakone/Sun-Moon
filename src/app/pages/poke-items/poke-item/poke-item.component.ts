import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeItem } from 'src/app/models/poke-item.model';
import { PokeItemService } from 'src/app/services/services.index';
import { Location } from '@angular/common';

@Component({
  selector: 'sun-moon-pokeitem',
  templateUrl: './poke-item.component.html',
  styleUrls: ['./poke-item.component.scss']
})

export class PokeItemComponent implements OnInit {

  pokeitem: PokeItem;
  urlImage: string = "../../../assets/images/poke-items/";

  constructor(private activatedRoute: ActivatedRoute,
              private _pokeitem: PokeItemService,
              private _location: Location) { }

  ngOnInit() {
    let pokeitemName = this.activatedRoute.snapshot.params.name;
    this._pokeitem.getPokeItemByName(pokeitemName)
     .subscribe(res => {
       this.pokeitem = res;
     })
  }

  goBack(){
    this._location.back();
  }

}
