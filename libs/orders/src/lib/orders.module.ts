import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {StepsModule} from 'primeng/steps';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { CartDeliveryAdressComponent } from './components/cart-delivery-adress/cart-delivery-adress.component';
import { CartPaiementCardComponent } from './components/cart-paiement-card/cart-paiement-card.component';
import { CartOrderConfirmationComponent } from './components/cart-order-confirmation/cart-order-confirmation.component';
import {InputTextModule} from 'primeng/inputtext';


export const routes: Route[] = [
  {
    path:'panier',
    component: CartPageComponent,
    children:[
    {path:'', redirectTo: 'validation', pathMatch: 'full'},
    { path:'validation',component: CartInfoComponent},
    { path:'livraison',component: CartDeliveryAdressComponent},
    { path:'paiement',component: CartPaiementCardComponent},
    { path:'confirmation',component: CartOrderConfirmationComponent},
    ]
  }]

;

@NgModule({
    imports: [
      CommonModule, 
      RouterModule.forChild(routes),
      CascadeSelectModule,
      StepsModule,
      InputTextModule
    ],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      CartInfoComponent,
      CartDeliveryAdressComponent,
      CartPaiementCardComponent,
      CartOrderConfirmationComponent
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
      CartInfoComponent,
      CartDeliveryAdressComponent,
      CartPaiementCardComponent,
      CartOrderConfirmationComponent,
      RouterModule
    ]
})
export class OrdersModule {
    constructor(private cartService: CartService){
        this.cartService.initCartLocalStorage();
    }
}
