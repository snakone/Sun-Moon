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
         TypeStatsService,
         TypesService,
         AbilityService} from './services.index';

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
    TypeStatsService,
    TypesService,
    AbilityService
  ]
})

export class ServicesModule { }
