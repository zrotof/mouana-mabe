import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { RippleModule } from 'primeng/ripple';


export const usersRoutes: Route[] = [
  {path: 'connexion',component: LoginComponent}
];

@NgModule({
    imports: [
      CommonModule, 
      FormsModule,
      ReactiveFormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forChild(usersRoutes),
      ButtonModule,
      InputTextModule,
      PasswordModule,
      RippleModule
    ],
    declarations: [
      LoginComponent
    ]
})
export class UsersModule {}
