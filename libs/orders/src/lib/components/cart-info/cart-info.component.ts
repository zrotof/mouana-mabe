import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@mouanamabe/products';
import { Cart, CartItem } from '../../models/cart';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart/cart.service';
import {MenuItem, MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.scss']
})
export class CartInfoComponent implements OnInit {

  //itemsList: Product[] = [];
  productList: CartProduct[]= [];
  total = 0;
  fees = 4.99;

  items!: MenuItem[] ;
  activeIndex = 1;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTotalPrice();
    this.getItems();
  }


  getItems(){
    this.productList = [];
    const cart = this.cartService.getCart().items;
    cart.forEach(cartItem =>{
      this.productService.getProduct(cartItem.productId).subscribe(result =>{

        this.productList.push(
          {
            id: result.message._id,
            name: result.message.name,
            image: result.message.imageVitrine,
            price: result.message.price,
            itemQuantity: cartItem.quantity,
            size: cartItem.size
          }
        );

      })
    })

  }

  minusProduct(productId:string, size: string){

      this.productList.map((item)  =>{
        if(item.itemQuantity > 1)

        if((item.id === productId) && (item.size === size)){
  
          item.itemQuantity -= 1;
  
          this.cartService.setCartItemFromCartPage({
            productId: productId,
            quantity: item.itemQuantity,
            size: item.size
          });
        }
  
        return item ;      
      })
  
    
  }


  plusProduct(productId:string, size: string){

    this.productList.map((item)  =>{

      if(item.itemQuantity < 100)
    
      if((item.id === productId) && (item.size === size)){

        item.itemQuantity += 1;

        this.cartService.setCartItemFromCartPage({
          productId: productId,
          quantity: item.itemQuantity,
          size: item.size
        });
      }

      return item ;      
    })

  }

  getTotalPrice(){

    this.cartService.cart$.subscribe( result =>{
      const cart = result.items;

      this.total = 0;


      cart.forEach(cartItem =>{

        
        this.productService.getProduct(cartItem.productId).subscribe(result =>{
          const product  = result.message;

           this.total += cartItem.quantity * product.price

        })

      })
    })
   
  }


  deleteProduct(productId: string, productSize: string){


    //Remove item from the displayed list
    const indexOfProductinListProduct = this.productList.findIndex(product => ((product.id === productId) && (product.size === productSize))); 
    if(indexOfProductinListProduct != -1){
      this.productList.splice(indexOfProductinListProduct,1);
    }

    //Remove item from the cart
    const cart = this.cartService.getCart();
    const indexOfProductInCart = cart.items.findIndex(product => ((product.productId === productId) && (product.size === productSize)));
      
      if(indexOfProductinListProduct != -1){
        (console.log("inside cart"))
        cart.items.splice(indexOfProductInCart,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartService.cart$.next(cart);

      }

  }


  onValidateCart(){
    this.router.navigate(['panier/livraison']);

    return;
  }


  
}
