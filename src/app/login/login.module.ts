import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { FormSignUpComponent } from './signup/form-signup/form-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SloganComponent } from './signup/slogan/slogan.component';
import { ImageGridComponent } from './signup/image-grid/image-grid.component';
import { FeaturesComponent } from './signup/features/features.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    FormSignUpComponent,
    SloganComponent,
    ImageGridComponent,
    FeaturesComponent
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
    FormSignUpComponent
  ]
})

export class LoginModule { }
