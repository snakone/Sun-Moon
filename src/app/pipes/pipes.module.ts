import { NgModule } from '@angular/core';
import { ImagesPipe } from './images/images.pipe';
import { TypesPipe } from './types/types.pipe';
import { MovesPipe } from './moves/moves.pipe';
import { PokemonPipe } from './pokemon/pokemon.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagesPipe,
    TypesPipe,
    MovesPipe,
    PokemonPipe
  ],
  exports: [
    ImagesPipe,
    TypesPipe,
    MovesPipe,
    PokemonPipe
  ]
})

export class PipesModule { }
