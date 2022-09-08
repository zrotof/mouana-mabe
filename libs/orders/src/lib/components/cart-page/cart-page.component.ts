import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@mouanamabe/products';
import { Cart, CartItem } from '../../models/cart';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart/cart.service';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  providers: [MessageService],
})
export class CartPageComponent implements OnInit {

  items!: MenuItem[];

  constructor(
 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initStepperheader();
  }

  initStepperheader(){


     this.items = [{
      label: 'Panier',
      routerLink: 'validation'
      
  },
  {
      label: 'Livraison',
      routerLink: 'livraison'
  },
  {
      label: 'Paiement',
      routerLink: 'paiement'
  },
  {
      label: 'Confirmation',
      routerLink: 'confirmation'
  }
];
}


}
