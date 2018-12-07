import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { TypeComponent } from './type/type.component';
import { TypeDetailsComponent } from './type/type-details/type-details.component';
import { TypeBestComponent } from './type/type-best/type-best.component';
import { TypesComponent } from './types.component';
import { TypePokemonComponent } from './type/type-pokemon/type-pokemon.component';
import { TypeFeaturesComponent } from './type/type-features/type-features.component';
import { TypeChartComponent } from './type/type-chart/type-chart.component';
import { TypeMovesComponent } from './type/type-moves/type-moves.component';
import { TypeItemsComponent } from './type/type-items/type-items.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    TypeComponent,
    TypeDetailsComponent,
    TypeBestComponent,
    TypesComponent,
    TypePokemonComponent,
    TypeFeaturesComponent,
    TypeChartComponent,
    TypeMovesComponent,
    TypeItemsComponent
  ],
  exports: []
})

export class TypesModule { }
