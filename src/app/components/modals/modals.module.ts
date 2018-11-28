import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTrainerComponent } from './edit-trainer/edit-trainer.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { EditMoveComponent } from './edit-move/edit-move.component';
import { CreateMoveComponent } from './create-move/create-move.component';
import { EditPictureComponent } from './edit-picture/edit-picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Pipes
import { PipesModule } from '../../pipes/pipes.module';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePokeItemComponent } from './create-poke-item/create-poke-item.component';
import { EditPokeItemComponent } from './edit-poke-item/edit-poke-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PipesModule,
  ],
  declarations: [
    EditTrainerComponent,
    CreatePokemonComponent,
    EditPictureComponent,
    EditPokemonComponent,
    CreateMoveComponent,
    EditMoveComponent,
    CreatePokeItemComponent,
    EditPokeItemComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    EditTrainerComponent,
    EditPictureComponent,
    EditPokemonComponent,
    CreatePokemonComponent,
    CreateMoveComponent,
    EditMoveComponent,
    CreatePokeItemComponent,
    EditPokeItemComponent
  ]
})
export class ModalsModule { }
