import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { BioComponent } from './bio/bio.component';
import { InfoComponent } from './info/info.component';
import { StatsComponent } from './stats/stats.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    PokemonComponent,
    BioComponent,
    InfoComponent,
    StatsComponent
  ],
  exports: [
    PokemonComponent,
    BioComponent,
    InfoComponent,
    StatsComponent
  ]
})

export class PokemonModule { }
