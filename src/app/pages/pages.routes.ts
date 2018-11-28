import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { PokedexComponent } from './pokedex/pokedex.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { VictoryRoadComponent } from './guides/victory-road/victory-road.component';
import { MovesComponent } from './moves/moves.component';
import { MoveComponent } from './moves/move/move.component';
import { PokeItemsComponent } from './poke-items/poke-items.component';
import { PokeItemComponent } from './poke-items/poke-item/poke-item.component';
import { AdminComponent } from './admin/admin.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerComponent } from './trainers/trainer/trainer.component';

const PagesRoutes: Routes = [
      // Send Data to Router so We know anytime where We are.
      { path: 'home', component: HomeComponent,
        data: { page: "Welcome", content:"Sun & Moon"}
      },
      { path: 'profile', component: ProfileComponent,
        data: { page: "Profile", content:"Account"}
      },
      // Pokémon Routes
      { path: 'pokedex', component: PokedexComponent,
        data: { page: "Pokédex", content:"Pokémon"}
      },
      { path: 'pokemon/:name', component: PokemonComponent,
        data: { page: "Pokémon", content:"Sun & Moon"}
      },
      { path: 'laboratory', component: LaboratoryComponent,
        data: { page: "Laboratory", content:"Pokémon"}
      },
      { path: 'moves', component: MovesComponent,
        data: { page: "Moves", content:"Pokémon"}
      },
      { path: 'move/:name', component: MoveComponent,
        data: { page: "Move", content:"Pokémon"}
      },
      { path: 'poke-items', component: PokeItemsComponent,
        data: { page: "Held Items", content:"Pokémon"}
      },
      { path: 'poke-item/:name', component: PokeItemComponent,
        data: { page: "Held Item", content:"Pokémon"}
      },
      // Guides Routes
      { path: 'guides/victory-road', component: VictoryRoadComponent,
        data: { page: "Victory Road", content:"Guides"}
      },
      { path: 'settings', component: AccountSettingsComponent,
        data: { page: "Settings", content:"Account"}
      },
      { path: 'searching/:value', component: SearchComponent,
        data: { page: "Search", content:"Sun & Moon"}
      },
      //Trainer Routes
      { path: 'trainers', component: TrainersComponent,
        data: { page: "Trainers", content:"Sun & Moon"}
      },
      { path: 'trainer/:name', component: TrainerComponent,
        data: { page: "Trainer", content:"Sun & Moon"}
      },
      // Admin Routes
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        loadChildren: './admin/admin.module#AdminModule' // Lazy Load
      },
      { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],  // Child Routes
  exports: [RouterModule]
})

export class PagesRoutingModule { }
