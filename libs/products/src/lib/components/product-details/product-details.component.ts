import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, OrdersService, CartItem } from '@mouanamabe/orders';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any;

  quantity = 1;
  tooltip = '';
  itemSize ='';
  isSizeAlreadyChoosed = false;

  colorsArray = [
    { value:"#417365",active:true},
    { value:"#711365",active:false},
    { value:"#817305",active:false}
  ];

  productImagesUrl : string[] = [];
  size: string | undefined;

  constructor(
    private productService: ProductsService,
    private cartService:  CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params =>{
        if(params['productid']){
          this.getProductById(params['productid']);
        }
      }
    )
  }

  getProductById(productid: string){
    this.productService.getProduct(productid).subscribe(
      result => {
        this.product = result.message;
        //Here we set colors array



        //Here setting the array of images displayed on gallery
        this.product?.images.forEach((element: string)=>{
          this.productImagesUrl.push(element)
        })

        this.productImagesUrl.unshift(this.product.imageVitrine)
      }
    )
  }


//THis function will be used to retrieve the product corresponding to color and the reference gived in parameters
  showproductByColor(col:any, reference: string){
    //If we click on the active color nothing happen
    if(col.active){
      return ;
    }

    this.colorsArray.forEach(element =>{
      element.active = false;
    })

    this.colorsArray.forEach(element => {
      if(element.value === col.value ){
        element.active = true;
      }
    });
/*
    this.productService.getproductByColorAndREference().subscribe(
      result =>{

      }
    )

  */
  }

  //This function help getting all colors of a product
  //We can have the same product but with different color
  //We want the user to access a version of a product by clicking on a color
  getAllColorsOfAllPproduct(){
    //
  }

  chooseSize(param: string){
    this.itemSize = param;
    this.isSizeAlreadyChoosed = true;
  }

  checkIfSizeChoosed(isProductWithManySizes: boolean){

    if(isProductWithManySizes){
      if(!this.isSizeAlreadyChoosed){
        this.tooltip = "Sélectionner une taille"
      }
      else{
        this.tooltip = ''
      }
    }
  }


  addProductTocart(isProductWithManySizes: boolean){

    if(isProductWithManySizes){  
      if(this.isSizeAlreadyChoosed){
        const newCartItem : CartItem = {
          productId: this.product._id,
          quantity: this.quantity,
          size: this.itemSize
        }
        console.log(this.cartService.getCart());
        this.cartService.setCartItem(newCartItem);
        console.log(this.cartService.getCart());

      }
    }
    else{
      const newCartItem : CartItem = {
        productId: this.product._id,
        quantity: this.quantity,
        size: ''
      }
      this.cartService.setCartItem(newCartItem);
    }
  }

}
