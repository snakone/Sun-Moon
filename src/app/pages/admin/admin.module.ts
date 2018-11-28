import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTrainersComponent } from './trainers/admin-trainers.component';
import { AdminPokemonComponent } from './pokemon/admin-pokemon.component';
import { AdminMoveComponent } from './move/admin-move.component';
import { AdminPokeItemComponent } from './poke-item/admin-poke-item.component';

import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminTrainersComponent,
    AdminPokemonComponent,
    AdminMoveComponent,
    AdminPokeItemComponent,
    AdminComponent
  ],
  exports: [
    FormsModule,
    PipesModule
  ]
})

export class AdminModule { }
