import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor(private cartService: CartService) { }

  itemNumber = 0;
  ngOnInit(): void {
    this.getItemCountInCart();
  }

  getItemCountInCart(){
    this.cartService.cart$.subscribe(cart =>{
      this.itemNumber = 0;
      if(cart?.items.length){
        for(const item of cart.items){
          this.itemNumber = this.itemNumber + item.quantity; 
        }
      }
      else{
        this.itemNumber = 0;
      }
    })

  }



}
