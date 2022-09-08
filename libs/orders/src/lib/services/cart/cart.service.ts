import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { 
    //
  }
  initCartLocalStorage(){

    const cart = this.getCart();

    if(!cart){
      const initialCart ={
        items: []
      }
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('cart',initialCartJson);
    }
  }

  //Function used to get the cart
  getCart(): Cart{
    const cartJsonString : string = localStorage.getItem('cart') as string;

    const cart : Cart = JSON.parse(cartJsonString);

    return cart;
  }

  //Function used to add a new item to the cart
  setCartItem(cartItem: CartItem): Cart{
    const cart: Cart = this.getCart();

    const cartItemAllreadyExist = cart.items.find((item)=> (item.productId === cartItem.productId) && (item?.size === cartItem?.size))
    
    if(cartItemAllreadyExist){

      cart.items.map(item =>{

        if((item.productId === cartItem.productId) && (item?.size === cartItem?.size)){

            item.quantity = item.quantity + cartItem.quantity;
    
        }
        return item;

      })
    }
    else{
      cart.items.push(cartItem);
    }

     localStorage.setItem('cart', JSON.stringify(cart));
      this.cart$.next(cart);

    return cart;
  }

  //Function used to add a new item to the cart
  setCartItemFromCartPage(cartItem: CartItem): Cart{
    const cart: Cart = this.getCart();

    const cartItemAllreadyExist = cart.items.find((item)=> (item.productId === cartItem.productId) && (item?.size === cartItem?.size))
    
    if(cartItemAllreadyExist){

      cart.items.map(item =>{

        if((item.productId === cartItem.productId) && (item?.size === cartItem?.size)){

            item.quantity = cartItem.quantity;
    
        }
        return item;

      })
    }
    else{
      cart.items.push(cartItem);
    }

     localStorage.setItem('cart', JSON.stringify(cart));
      this.cart$.next(cart);
     return cart;
  }


}
