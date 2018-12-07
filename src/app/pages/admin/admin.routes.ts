import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminTrainersComponent } from '../admin/trainers/admin-trainers.component';
import { AdminPokemonComponent } from '../admin/pokemon/admin-pokemon.component';
import { AdminMoveComponent } from '../admin/move/admin-move.component';
import { AdminPokeItemComponent } from '../admin/poke-item/admin-poke-item.component';
import { AdminAbilityComponent } from './ability/admin-ability.component';


const AdminRoutes: Routes = [
      // Send Data to Router so We know anytime where are We.
      // Admin Routes
      {
        path: 'trainers',
        component: AdminTrainersComponent,
        data: { page: "Trainers", content:"Admin"}
      },
      {
        path: 'pokemon',
        component: AdminPokemonComponent,
        data: { page: "Pokémon", content:"Admin"}
      },
      {
        path: 'moves',
        component: AdminMoveComponent,
        data: { page: "Move", content:"Admin"}
      },
      {
        path: 'abilities',
        component: AdminAbilityComponent,
        data: { page: "Abilities", content:"Admin"}
      },
      {
        path: 'poke-items',
        component: AdminPokeItemComponent,
        data: { page: "Held Items", content:"Admin"}
      }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],  // Child Routes
  exports: [RouterModule]
})

export class AdminRoutingModule { }
