import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@mouanamabe/products';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'eshop-admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class CategoriesListComponent implements OnInit {

  categoriesList: Category[] = [];

  endSubs$ : Subject<any> = new Subject();
  constructor(
    private categoriesService: CategoriesService, 
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  /*
  ngOnDestroy(): void {
      this.endSubs$.complete();
  }
*/
  getCategoriesList(){

    this.categoriesService.getCategories()
    .subscribe(
      (result : any)=>{

        if(result.success){
          
      this.categoriesList = result.message;}
    }
    
    )
  }

  editCategory(categoryId: string){

    this.categoriesService.getCategory(categoryId)
    .subscribe(
      (result : any) => {

        if(result.success){
          this.router.navigateByUrl(`categories/modifier-catégorie/${categoryId}`)

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

  deleteCategory(categoryId : string){
      this.confirmationService.confirm({
          message: 'Voulez-vous vraiment supprimer cette catégories?',
          accept: () => {
              //Actual logic to perform a confirmation
              this.categoriesService.deleteCategory(categoryId)
              .subscribe(
                  (result : any) =>{
                  if(result.success == true ){

                    //affichage du message lors d'un ajout sans erreur
                    this.messageService.add({severity:'success', detail: result.message});
                    this.getCategoriesList();

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
