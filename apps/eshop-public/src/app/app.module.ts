import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './components/home/home.component';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from '@mouanamabe/products';
import { UiModule } from '@mouanamabe/ui';
import { AppRoutingModule } from './app-routing-module';
import { OrdersModule } from '@mouanamabe/orders';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomeComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    AppRoutingModule,
    ProductsModule,
    OrdersModule,
    UiModule,
    AccordionModule, 
    ButtonModule,
    HttpClientModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
 