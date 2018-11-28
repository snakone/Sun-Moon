import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages.routes';

// Admin
import { AdminModule } from './admin/admin.module';

// Modules
import { MaterialModule } from '../material/material.module';
import { PokemonModule } from './pokemon/pokemon.module';

// Search
import { SearchModule } from './search/search.module';

// Pages
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';

// Profile
import { ProfileModule } from './profile/profile.module';

// Account Settings
import { ThemePickerComponent } from './account-settings/theme-picker/theme-picker.component';
import { UpdateInfoComponent } from './account-settings/update-info/update-info.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Components
import { ResultComponent } from './laboratory/result/result.component';
import { VictoryRoadComponent } from './guides/victory-road/victory-road.component';
import { MovesComponent } from './moves/moves.component';
import { MoveComponent } from './moves/move/move.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerComponent } from './trainers/trainer/trainer.component';
import { PokeItemsComponent } from './poke-items/poke-items.component';
import { PokeItemComponent } from './poke-items/poke-item/poke-item.component';

// 3rd Libraries

@NgModule({
  declarations: [
    HomeComponent,
    AccountSettingsComponent,
    ThemePickerComponent,
    UpdateInfoComponent,
    PokedexComponent,
    LaboratoryComponent,
    ResultComponent,
    VictoryRoadComponent,
    MovesComponent,
    MoveComponent,
    TrainersComponent,
    TrainerComponent,
    PokeItemsComponent,
    PokeItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    SearchModule,
    MaterialModule,
    PokemonModule
  ],
  exports: [
  ]
})

export class PagesModule { }
