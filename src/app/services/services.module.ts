import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
         SharedService,
         SidebarService,
         TrainerService,
         UploadFileService,
         PokedexService,
         MoveService,
         PokeItemService,
         PokemonService,
         TypesService } from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    TrainerService,
    UploadFileService,
    PokedexService,
    MoveService,
    PokeItemService,
    PokemonService,
    TypesService
  ]
})

export class ServicesModule { }
