import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { MakeTeamComponent } from './make-team/make-team.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamRankingComponent } from './team-ranking/team-ranking.component';
import { TeamTypesComponent } from './team-types/team-types.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    TeamStatsComponent,
    MakeTeamComponent,
    TeamRankingComponent,
    TeamTypesComponent
  ],
  exports: [
    TeamStatsComponent,
    TeamRankingComponent
  ]
})

export class ProfileModule { }
