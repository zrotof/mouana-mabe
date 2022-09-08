import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@mouanamabe/products';
import { UsersService } from '@mouanamabe/users';
import { OrdersService } from '@mouanamabe/orders';

@Component({
  selector: 'eshop-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userTotal = '/';
  salesTotal = '/';
  productTotal= '/';
  orderTotal = '/';

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getUserTotal();
    this.getProductTotal();
    this. getOrdersTotal();
    this.getSalesTotal();
  }

  getUserTotal(){
    this.userService.getUserTotal()
    .subscribe(
      (result : any) =>{
        this.userTotal = result.message;
      },
      ()=>{
        this.userTotal = '/';
      })
  }

  getProductTotal(){
    this.productService.getProductTotal()
    .subscribe(
      (result : any) =>{
        this.productTotal = result.message;
      },
      ()=>{
        this.productTotal = '/';
      })
  }

  getOrdersTotal(){

    /*
    this.orderService.getOrderTotal()
    .subscribe(
      (result : any) =>{
        this.orderTotal = result.message;
      },
      ()=>{
        this.orderTotal = '/';
      })
      */
  }

  getSalesTotal(){

    /*
    this.productService.getSalesTotal()
    .subscribe(
      (result : any) =>{
        this.salesTotal = result.message;
      },
      ()=>{
        this.salesTotal = '/';
      })
      */
  }


}
