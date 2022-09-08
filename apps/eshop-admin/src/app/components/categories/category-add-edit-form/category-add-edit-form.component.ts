import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService, Category } from '@mouanamabe/products';
import { lastValueFrom, timer } from 'rxjs';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eshop-admin-category-add-edit-form',
  templateUrl: './category-add-edit-form.component.html',
  styleUrls: ['./category-add-edit-form.component.scss'],
  providers: [MessageService]
})
export class CategoryAddEditFormComponent implements OnInit {

//contact form declaration
categoryForm : FormGroup;
isCategorySaveButtonClicked = false;
isCategoryEditButtonClicked = false
imageDisplay!: string | ArrayBuffer | null;
isEditMode = false;
isImageEdit = false;
initialCategoryDataWhenEdit: any ;

  constructor(

    private fb: FormBuilder, 
    private categoriesService: CategoriesService, 
    private messageService : MessageService, 
    private location: Location,
    private router : Router,
    private activatedRoute: ActivatedRoute) {

    this.categoryForm = this.fb.group({
      nameCategory: ["", [Validators.required]],
      imageCategory: ["", Validators.required],
      withManySizeCategory: [true]
    });

   }

  ngOnInit(): void {
    this.checkEditMode();
    
  }


  showImagePreview(event: any){
    
    
    const file = event.target.files[0];

    if(file){

      this.isImageEdit = true;
      this.categoryForm.patchValue({imageCategory: file});
      this.formControls['imageCategory'].updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageDisplay = fileReader.result;
      }

      fileReader.readAsDataURL(file);

      const imgElement = <HTMLElement>document.getElementById('image-previewed');
      imgElement.style.display = 'block';
    }

    

  }

  onSaveCategory(){

    this.isCategorySaveButtonClicked = true;

    if(this.categoryForm.invalid){
      return; 
    }

    const newCreatedCategoryFormData = new FormData();

    newCreatedCategoryFormData.append('name', this.categoryForm.controls['nameCategory'].value);
    newCreatedCategoryFormData.append('image', this.categoryForm.controls['imageCategory'].value);
    newCreatedCategoryFormData.append('withManySize', this.categoryForm.controls['withManySizeCategory'].value);

    
    this.categoriesService.addCategory(newCreatedCategoryFormData)
    .subscribe(
      (result : any) =>{
      if(result.success == true ){

        //affichage du message lors d'un ajout sans erreur
        this.messageService.add({severity:'success', detail: result.message});
        lastValueFrom(timer(2000))
        .then( 

          //après l'ajout d'une catégorie on revient à la liste
          () =>{ this.location.back()});

      }
      else{
        this.messageService.add({severity:'error', detail: result.message});
      }
    },
    () =>{
      this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
    }
    )}

  get formControls(){
    return this.categoryForm.controls;
  }

  onCancelAddEditCategory(){
    this.router.navigateByUrl('catégories');
  }

  //This function is use to initialise form when editing a category
  checkEditMode(){

      this.activatedRoute.params.subscribe(
        (params : any)=>{
          if(params.id){
          this.isEditMode =true;

          this.categoriesService.getCategory(params.id).subscribe(
            (result : any) => {

              if(result.success){

                //initialising first data when edit in order to kow if value have changes

                this.initialCategoryDataWhenEdit = result.message;
                this.categoryForm.controls['nameCategory'].setValue(result.message.name);
                this.categoryForm.controls['withManySizeCategory'].setValue(result.message.withManySize)       
                const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
                this.imageDisplay = `${result.message.image}`;
                imagePreviewed.style.display = 'block';
            
              }
            },
            () =>{
              this.messageService.add({severity:'warn', detail: 'Categorie inexistante, contactez le webmaster'});
              return;
            }
          )}
        },
        () =>{
          this.messageService.add({severity:'warn', detail: 'Catégorie inconnue' });
          return;
        }
      )}
  

  onEditCategory(){

    
    this.isCategoryEditButtonClicked = true;

    

    if((
      this.categoryForm.controls['nameCategory'].value ==  this.initialCategoryDataWhenEdit.name
      &&
      this.categoryForm.controls['withManySizeCategory'].value ==  this.initialCategoryDataWhenEdit.withManySize )
      && 
      !this.isImageEdit){

      this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
      return ;
    }

    if(this.categoryForm.invalid && !this.categoryForm.controls['nameCategory'].value){
     
      return;
    }
    
    const newCreatedCategoryFormData = new FormData();

    newCreatedCategoryFormData.append('name', this.categoryForm.controls['nameCategory'].value);
    newCreatedCategoryFormData.append('image', this.categoryForm.controls['imageCategory'].value);
    newCreatedCategoryFormData.append('withManySize', this.categoryForm.controls['withManySizeCategory'].value);

    this.categoriesService.editCategory(this.initialCategoryDataWhenEdit._id, newCreatedCategoryFormData).subscribe(
      (result)=>{

        if(result.success){
         //affichage du message lors d'un ajout sans erreur
         this.messageService.add({severity:'success', detail: result.message});
         lastValueFrom(timer(2000))
         .then( 
 
           //après l'ajout d'une catégorie on revient à la liste
           () =>{ this.location.back()}
          );
        }
      },
      ()=>{
        this.messageService.add({severity:'info', detail: 'Categorie inconnue'});

      }
    )


  }
}
