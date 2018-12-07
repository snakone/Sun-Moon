import { Component, OnInit } from '@angular/core';
import { AbilityService } from 'src/app/services/services.index';
import { Ability } from 'src/app/models/ability.model';

@Component({
  selector: 'sun-moon-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})

export class AbilitiesComponent implements OnInit {

  abilities: Ability[] = [];
  filteredAbilities: Ability[] = [];
  searchValue: string = "";
  count: number = 0;
  urlImage: string = "../../../assets/images/abilities/";

  constructor(private _ability:AbilityService) { }

  ngOnInit() {
    if (this._ability.abilities.length == 0){  // No Abilities? Get from Server
      setTimeout(()=> {
          this.getAbilities();  // Virtual Scroll??
      }, 500);
    } else {  // Get from Service
      this.abilities = this._ability.abilities;
      this.filteredAbilities = this.abilities;
      this.count = this._ability.count;
    }
  }

  getAbilities(){
    this._ability.getAbilityList()
     .subscribe((res:any) => {
       this.abilities = res.abilities;
       this._ability.abilities = this.abilities;
       this.filteredAbilities = this.abilities;
       this.count = res.abilityCount;
       this._ability.count = this.count;
     });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokemonbySearch();  // Filter Ability
  }

  filterPokemonbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredAbilities = this.abilities.filter(ability => {  // Filter Array
       // ngModel on Input Text - Search Value
       return ability.name.match(filter);  // Filter Original List
     } );
   }

}
