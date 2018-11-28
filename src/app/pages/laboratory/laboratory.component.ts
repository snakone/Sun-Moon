import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { TYPES, STATS, EVOLUTIONS } from 'src/app/config/data';
import { PokemonService } from 'src/app/services/services.index';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'sun-moon-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})

export class LaboratoryComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;  // Trainer INFO
  secondFormGroup: FormGroup;  // Trainer Avatar
  thridFormGroup: FormGroup;  // Community
  types: string[];
  stats: string[];
  evolutions: string[];
  pokemons: Pokemon[] = [];
  selection: any = {}; // Pass it to Child Component
  loading: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _laboratory: PokemonService) { }

  ngOnInit() {
    this.types = TYPES;
    this.stats = STATS;
    this.evolutions = EVOLUTIONS;
    this.createForm();
    this.typeValueChanges();
    this.statValueChanges();
    this.evolutionValueChanges();
 }

 createForm(){  // Join ALL Forms
   this.firstFormGroup = this._formBuilder.group({
     type: ['Any'],  // Type
   });

   this.secondFormGroup = this._formBuilder.group({
     stat: ['Any']  // Stat
   });

   this.thridFormGroup = this._formBuilder.group({
     evolution: ['Any'],  // Evolution
   });
 }

 onChangeFilter(type:string, stat:string, evolution:string){
   this.selection = {type:type, stat:stat, evolution:evolution};  // Send to Child
   this._laboratory.filterPokemon(type, stat, evolution)
    .subscribe((res:any) => {
      this.pokemons = res.pokemon as Pokemon[];
      this.loading = false;
    });
 }

 setType(type:string){
   this.firstFormGroup.value.type = type;
   this.loading = true;
   this.onChangeFilter(this.firstFormGroup.value.type,
                       this.secondFormGroup.value.stat,
                       this.thridFormGroup.value.evolution);
 }

 typeValueChanges(){  // When Type Changes - Filter Data
   this.firstFormGroup.valueChanges
    .subscribe(res => {
      this.loading = true;
      this.onChangeFilter(res.type,
                          this.secondFormGroup.value.stat,
                          this.thridFormGroup.value.evolution);
    });
 }

 statValueChanges(){  // When Stat Changes - Filter Data
   this.secondFormGroup.valueChanges
    .subscribe(res => {
      this.loading = true;
      this.onChangeFilter(this.firstFormGroup.value.type,
                          res.stat,
                          this.thridFormGroup.value.evolution);
    });
 }

 evolutionValueChanges(){  // When Evolution Changes - Filter Data
   this.thridFormGroup.valueChanges
    .subscribe(res => {
      this.loading = true;
      this.onChangeFilter(this.firstFormGroup.value.type,
                          this.secondFormGroup.value.stat,
                          res.evolution);
    });
 }

 reset(){
   this.pokemons = [];
   this.firstFormGroup.value.type = "Any";
   this.secondFormGroup.value.stat = "Any";
   this.thridFormGroup.value.evolution = "Any";
 }

}
