import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';
import { Error404Component } from './error404/error404.component';
import { ModalsModule } from '../components/modals/modals.module';
import { LoadingComponent } from '../components/loading/loading.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    ModalsModule,
    MaterialModule
  ],
  declarations: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent,
    LoadingComponent,
    Error404Component  // Page Not Found
  ],
  exports: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component,
    LoadingComponent
  ]
})

export class SharedModule { }
