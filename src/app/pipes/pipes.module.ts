import { NgModule } from '@angular/core';
import { ImagesPipe } from './images/images.pipe';
import { TypesPipe } from './types/types.pipe';
import { MovesPipe } from './moves/moves.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagesPipe,
    TypesPipe,
    MovesPipe
  ],
  exports: [
    ImagesPipe,
    TypesPipe,
    MovesPipe
  ]
})

export class PipesModule { }
