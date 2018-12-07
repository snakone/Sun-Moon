import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { VictoryRoadComponent } from './victory-road/victory-road.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { InvasionComponent } from './invasion/invasion.component';


const GuidesRoutes: Routes = [
      // Send Data to Router so We know anytime where are We.
      // Admin Routes
      {
        path: 'victory-road',
        component: VictoryRoadComponent,
        data: { page: "Victory Road", content:"Guides"}
      },
      {
        path: 'challenge',
        component: ChallengeComponent,
        data: { page: "Trainer Challenge", content:"Guides"}
      },
      {
        path: 'invasion',
        component: InvasionComponent,
        data: { page: "Pokémon Invasion", content:"Guides"}
      },

];

@NgModule({
  imports: [RouterModule.forChild(GuidesRoutes)],  // Child Routes
  exports: [RouterModule]
})

export class GuidesRoutingModule { }
