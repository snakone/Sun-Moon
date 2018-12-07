import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages.routes';

// Profile
import { ProfileModule } from './profile/profile.module';

// Admin
import { AdminModule } from './admin/admin.module';

import { NgxPaginationModule } from 'ngx-pagination';

// Modules
import { MaterialModule } from '../material/material.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypesModule } from './types/types.module';
import { GuidesModule } from './guides/guides.module';

// Search
import { SearchModule } from './search/search.module';

// Pages
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ResultComponent } from './laboratory/result/result.component';
import { MovesComponent } from './moves/moves.component';
import { MoveComponent } from './moves/move/move.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerComponent } from './trainers/trainer/trainer.component';
import { PokeItemsComponent } from './poke-items/poke-items.component';
import { PokeItemComponent } from './poke-items/poke-item/poke-item.component';

// Account Settings
import { ThemePickerComponent } from './account-settings/theme-picker/theme-picker.component';
import { UpdateInfoComponent } from './account-settings/update-info/update-info.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AbilitiesComponent } from './abilities/abilities.component';
import { AbilityComponent } from './abilities/ability/ability.component';
import { PokemonAbilityComponent } from './abilities/ability/pokemon-ability/pokemon-ability.component';

// Components

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
    MovesComponent,
    MoveComponent,
    AbilitiesComponent,
    AbilityComponent,
    TrainersComponent,
    TrainerComponent,
    PokeItemsComponent,
    PokeItemComponent,
    PokemonAbilityComponent
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
    PokemonModule,
    TypesModule,
    GuidesModule,
    NgxPaginationModule
  ],
  exports: [
  ]
})

export class PagesModule { }
