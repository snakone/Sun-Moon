import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictoryRoadComponent } from './victory-road/victory-road.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { InvasionComponent } from './invasion/invasion.component';
import { GuidesComponent } from './guides.component';
import { GuidesRoutingModule } from './guides.routes';

@NgModule({
  imports: [
    CommonModule,
    GuidesRoutingModule
  ],
  declarations: [
    VictoryRoadComponent,
    ChallengeComponent,
    InvasionComponent,
    GuidesComponent
  ]
})

export class GuidesModule { }
