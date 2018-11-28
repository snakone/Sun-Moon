import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material';  // Material Dialog
import { EditPictureComponent } from 'src/app/components/modals/edit-picture/edit-picture.component';
import { CreatePokemonComponent } from 'src/app/components/modals/create-pokemon/create-pokemon.component';
import { EditPokemonComponent } from 'src/app/components/modals/edit-pokemon/edit-pokemon.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './admin-pokemon.component.html',
  styleUrls: ['./admin-pokemon.component.scss']
})

export class AdminPokemonComponent implements OnInit {

  constructor(private _pokemon: PokemonService,
              public dialog: MatDialog) { }

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  totalPokemons: number = 0;
  options: ScrollToOptions;
  searchValue: string;

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(){
      this._pokemon.getPokemonList()
       .subscribe((res:any) => {
         this.pokemons = res.pokemons;
         this.filteredPokemons = this.pokemons;
         this.totalPokemons = res.pokemonCount;
       });
  }

  editPokemon(pokemon:Pokemon){
    const dialogRef = this.dialog.open(EditPokemonComponent,{data:pokemon});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokemons();
        }, 1500)
      }  // End of If (result)
    });
  }

  openPokemonDialog(){
    const dialogRef = this.dialog.open(CreatePokemonComponent,{});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokemons();
        }, 1500)
      }  // End of If (result)
    });
  }

  openImageDialog(pokemon:Pokemon){
    let data = {
      _id: pokemon._id,
      collection: 'Pokemon'
    }
    const dialogRef = this.dialog.open(EditPictureComponent,{data:data});  // New Dialog

    dialogRef.afterClosed().subscribe(result => { // After Dialog Closed
    if (result) {
        setTimeout(() => {  // Wait a bit to get Updated Data Again
           this.getPokemons();
        }, 1500)
      }  // End of If (result)
    });
  }

  deletePokemon(pokemon:Pokemon){
     Swal({
       title: "¿Are You sure?",
       text: `You are about to delete ${pokemon.name}`,
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
       })
      .then(res => {
        if (res.value){
          this._pokemon.deletePokemon(pokemon._id)
           .subscribe(() => {
             Swal('Alright!', 'Pokémon Deleted', 'info');
             this.getPokemons();
           });
        }
      });
  }

  onKeyUp(event){  // On Key Up Javascript Event
    event.preventDefault();
    this.filterPokemonbySearch();  // Filter Pokemon
  }

  filterPokemonbySearch() {
    let filter = new RegExp (this.searchValue, 'i');
      this.filteredPokemons = this.pokemons.filter(pokemon => {  // Filter Array
       // ngModel on Input Text - Search Value
       return pokemon.name.match(filter);  // Filter Original List into Filtered List
     } );
   }


}
