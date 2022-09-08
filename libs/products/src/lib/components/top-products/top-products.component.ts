import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'products-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  topProducts : Product[] = [];
  responsiveOptions: any;

  constructor(private productService: ProductsService) { 
    this.responsiveOptions = [
      {
          breakpoint: '1100px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '914px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '675px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.getTopProduct();

  }

  getTopProduct(){
    this.productService.getTopProducts()
    .subscribe(
      (result : any) => {
        this.topProducts = result.message;
      }
    )
  }

}
