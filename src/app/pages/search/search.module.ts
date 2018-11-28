import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';

import { SearchTrainersComponent } from './search-trainers/search-trainers.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { SearchMovesComponent } from './search-moves/search-moves.component';
import { SearchPokeItemComponent } from './search-poke-items/search-poke-items.component';
import { SearchComponent } from './search.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    SearchComponent,
    SearchTrainersComponent,
    SearchPokemonComponent,
    SearchMovesComponent,
    SearchPokeItemComponent
  ]
})

export class SearchModule { }
