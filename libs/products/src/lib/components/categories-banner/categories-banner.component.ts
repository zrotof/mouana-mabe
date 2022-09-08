import { Component, OnInit } from '@angular/core';
import { Category } from '@mouanamabe/products';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit {
  topCategoriesList : Category[] = [];

  constructor(private categoryServices: CategoriesService) { 
    //
  }

  ngOnInit(): void {

    this.getAllTopCategories();

  }


  getAllTopCategories(){
    this.categoryServices.getCategories()
    .subscribe(
      (result : any ) =>{
        this.topCategoriesList = result.message;
      }
    ),
    (err: any)=>{
      console.log(err);
      
    }
  }

}
