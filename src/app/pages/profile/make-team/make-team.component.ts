import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonService, TrainerService } from 'src/app/services/services.index';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'

@Component({
  selector: 'sun-moon-make-team',
  templateUrl: './make-team.component.html',
  styleUrls: ['./make-team.component.scss']
})

export class MakeTeamComponent implements OnInit {

  pokedex: Pokemon[] = [];
  team: Pokemon[] = [];
  @Input() trainer: Trainer;
  @Output() emitChange: EventEmitter<Trainer> = new EventEmitter();
  urlImage: string = "../../../../assets/images/pokemon/";

  constructor(private _pokemon: PokemonService,
              public _trainer: TrainerService) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon(){
    if (this._pokemon.pokemonList.length == 0){  // No Pokédex? Get from Server
      this._pokemon.getPokemonList()
       .subscribe((res:any) => {
         this.pokedex = res.pokemons;
         this._pokemon.pokemonList = this.pokedex;
       })
     } else { // Get from Service
        this.pokedex = this._pokemon.pokemonList;
      }
  }

  addTeam(){
    this.team = Object.assign([],this.trainer.team);  // New Object
  }

  drop(event: CdkDragDrop<string[]>) {  // Drag and Drop
    if (this.team.length >= 6 && event.previousContainer.data.length > 6) {
        Swal('Error', '6 Pokémon MAX!', 'error');
        return false;  // Data > 6 = Entire Pokédex
     }

    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, // Same Container? Move
                        event.previousIndex,
                        event.currentIndex);
      } else {  // Transfer
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
  }

  saveTeam(){
    if (this.team.length <= 0) {
      return false;
    }

    Swal({
     title: "¿Are You sure?",
     text: `Register this Team?`,
     type: "info",
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
     })
    .then(res => {
      if (res.value){
        this.trainer.team = this.team;
        this._trainer.updateTrainer(this.trainer)  // Update
         .subscribe(res => {
           Swal('Great', 'Pokémon Team Created!', 'success');
           this.trainer = res as Trainer;
           this.emitChange.emit(this.trainer); // Emit new Trainer to Father
         })
      }
    });
  }

  reset(){
    this.team = [];
    this.getPokemon();
  }

}
