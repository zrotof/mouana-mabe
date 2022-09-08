import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@mouanamabe/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ProductsListComponent implements OnInit {
  productsList: Product[] = [];
  categoriesList : any[]= [];

  //This button is used to know if we are ine a button that correspond to a category (retrieve only data of that category) or we are on the button that retrieve all mixed categories data
  isCurrentCategoryButtonGeneral = true;


  constructor(
    private productServices : ProductsService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private categoryService : CategoriesService, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllCategoriesNames();
    this.getAllProducts();
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
      () =>{

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

  getAllProducts(categoryId?: number ){

      this.productServices.getProducts(<any>categoryId).subscribe(
        (result: any)=>{
          if(result.success){
            if(result.message.length == 0) {
              this.productsList = result.message;
              this.messageService.add({ detail: 'Cette catégorie ne possède pas encore de produits'});
            }
            else{
              this.productsList = result.message;
            }
          }
        },
        (err =>{
          this.messageService.add({severity:'info', detail: 'Erreur contactez le webmaster'});
        })
      )    
  }


  editProduct(productId: string){

    this.productServices.getProduct(productId)
    .subscribe(
      (result : any) => {

        if(result.success){
          this.router.navigateByUrl(`produits/modifier-produit/${productId}`)

        }

        else{
          this.messageService.add({severity:'warn', detail: result.message });
        }
      },
      (err) =>{
        this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
      }
    )
  }

  
  deleteProduct(productId: string, categoryId: number){

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet article?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.productServices.deleteProduct(productId)
          .subscribe(
              (result : any) =>{
              if(result.success == true ){

                //affichage du message lors d'un ajout sans erreur
                this.messageService.add({severity:'success', detail: result.message});

                //retrieve data after deleting

                if(this.isCurrentCategoryButtonGeneral){
                  this.getAllProducts();
                }
                else{
                this.getAllProducts(categoryId);
                }

              }
              else{
                this.messageService.add({severity:'error', detail: result.message});
              }
            },
            (err) =>{
              this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
            }
          )
    },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'info', detail:'Suppression annulée'});
                break;
            }
        }
  }
  )}

  

}
