import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";

import { JwtInterceptor, UsersModule } from '@mouanamabe/users';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShellComponent } from './components/shell/shell.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoryAddEditFormComponent } from './components/categories/category-add-edit-form/category-add-edit-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductAddEditFormComponent } from './components/products/product-add-edit-form/product-add-edit-form.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserAddEditComponent } from './components/users/user-add-edit/user-add-edit.component';



import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ColorPickerModule } from "primeng/colorpicker";
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {BadgeModule} from 'primeng/badge';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent,CategoriesListComponent, CategoryAddEditFormComponent, ProductsListComponent, ProductAddEditFormComponent, UsersListComponent, UserAddEditComponent],
    imports: [
        BrowserModule, 
        BrowserAnimationsModule, 
        HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        TableModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule,
        ColorPickerModule,
        InputNumberModule,
        InputTextModule,
        DropdownModule,
        EditorModule,
        InputSwitchModule,
        RadioButtonModule,
        CheckboxModule,
        BadgeModule,
        UsersModule,
        AppRoutingModule    
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
