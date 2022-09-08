import { Component, OnInit } from '@angular/core';
import { CategoriesService} from '../../services/categories/categories.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss']
})
export class PageProductsComponent implements OnInit {

  categoriesList : any[]= [];
  productsList: Product[] = [];
  isCurrentCategoryButtonGeneral = false;

  constructor( 
    private productService : ProductsService,
    private categoryService : CategoriesService, 
    private router: Router) { 
    //
  }

  ngOnInit(): void {
    this.getAllCategoriesNames();
    this.getAllProducts();
  }

  getAllProducts(categoryId?: number ){

    this.productService.getProducts(<any>categoryId).subscribe(
      (result: any)=>{
        if(result.success){
          if(result.message.length == 0) {
            this.productsList = result.message;
           // this.messageService.add({ detail: 'Cette catégorie ne possède pas encore de produits'});
          }
          else{
            this.productsList = result.message;
          }
        }
      },
      (err =>{
        //this.messageService.add({severity:'info', detail: 'Erreur contactez le webmaster'});
      })
    )    
}

  getAllCategoriesNames(){
    this.categoryService.getCategoriesNames().subscribe(
      (result : any) =>{

        this.categoriesList.push({
          name: 'Tous les articles', class: 'active-category'
        })

        result.message.forEach((category : any) => {
          this.categoriesList.push({
            id: category._id,
            name: category.name,
            class: ''
          });
        });
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  
  //This function is to change the color of the clicked category 
  // It permit also to only have a list of products that belong to a spécifique category or all products if clicked on all products button
  categoryChoosed(index: number, categoryId: number){

    //Setting tha active class
    this.categoriesList.forEach(category =>{
      category.class = '';
    });
    this.categoriesList[index].class ='active-category'

    this.isCurrentCategoryButtonGeneral = index === 0 ? true: false;
   

      //fetching products corresponding to the clicked category
      //Si index null on est sur le boutton tous les produits et dans ce cas on renvoit tous les produits de la BDD
      this.getAllProducts(categoryId);
   
  }

}
