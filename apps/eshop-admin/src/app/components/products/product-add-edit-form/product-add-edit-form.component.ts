import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService, Category, ProductsService, Product } from '@mouanamabe/products';
import { lastValueFrom, timer } from 'rxjs';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eshop-admin-product-add-edit-form',
  templateUrl: './product-add-edit-form.component.html',
  styleUrls: ['./product-add-edit-form.component.scss'],
  providers: [MessageService]

})
export class ProductAddEditFormComponent implements OnInit {

//contact form declaration
productForm : FormGroup;

//Boolean variable used to know if we have clicked the saved button
isProductSaveButtonClicked = false;

//Boolean variable used to know if we have clicked the saved button
isProductEditButtonClicked = false

//string variable used to store imageVitrine link 
imageVitrineDisplay!: string | ArrayBuffer | null;

//Boolean variable used to know if we have edit image vitrine
isImageVitrineEdit = false;

//array of strings variable used to store other showcased images link 
imagesLinks: (string | ArrayBuffer | null)[] = [];

//Boolean variable used to know if we have edit the array of images
isImagesArrayEdit = false;

//Boolean variable used to know if we on edit mode or not
isEditMode = false;

//Array use to store initial value of a product before modification
initialProductDataWhenEdit: any ;

//Arrayused to store all categories stored on DB
categoriesList : Category[]= [];

//Boolean variable used in order to set the total number of items:
  //When we have items like shirt or joggins , we have to edit thenumber of items for many sizes like S, M, XL ...
  //When we have item like casquette we just have to set the total number of item
//So this variable will help to display de correct input(s) for product sizes
isProductWithManySizes = false;


//Boolean variable used to know if the product is for adult or not
isProductIsForAdult = true;


  constructor(
    private fb: FormBuilder, 
    private categoriesService: CategoriesService, 
    private productsService: ProductsService,
    private messageService : MessageService, 
    private location: Location,
    private router : Router,
    private activatedRoute: ActivatedRoute
    ){

    this.productForm = this.fb.group({
      nameProduct: ["", [Validators.required]],
      priceProduct: ["", [Validators.required,Validators.min(0)]],
      quantityProduct: [0, [Validators.min(0)]],
      imageVitrineProduct: ["", Validators.required],
      categoryProduct: ["", [Validators.required,Validators.required]],
      forAdult: [true, Validators.required],
      colorProduct: ["#bbbbbb", Validators.required],
      imagesProduct:["", [Validators.required]],
      sexe: [''],
      sizeXS: [0, [ Validators.min(0)]],
      sizeS: [0, [ Validators.min(0)]],
      sizeM: [0, [ Validators.min(0)]],
      sizeL: [0, [ Validators.min(0)]],
      sizeXL: [0, [ Validators.min(0)]],
      sizeXXL: [0, [ Validators.min(0)]],
      detailsProduct: ['', Validators.required],
      topProduct: [false, Validators.required]

    });
 }

  ngOnInit(): void {
    this.getAllCategories();
    this.checkEditMode();
  }

  //Function that permit us to easely have our form controls
  get formControls(){
    return this.productForm.controls;
  }

  //Fucntion that help to display the principal image of a product when selecting it from the folder file
  showImagePreview(event: any){
    

    if(event.target.files.length == 1){

      const file = event.target.files[0];
      this.isImageVitrineEdit = true;
      this.productForm.patchValue({imageVitrineProduct: file});
      this.formControls['imageVitrineProduct'].updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageVitrineDisplay = fileReader.result;
      }

      fileReader.readAsDataURL(file);

      const imgElement = <HTMLElement>document.getElementById('image-previewed');
      imgElement.style.display = 'block';
    }

    else{
      if(event.target.files.length > 1){

        this.imagesLinks = [];

        const files = event.target.files;

        this.isImagesArrayEdit = true;
        this.productForm.patchValue({imagesProduct: [...files]});
        this.formControls['imagesProduct'].updateValueAndValidity();


        for(let i = 0; i< files.length; i++){

          const fileReader = new FileReader();
          fileReader.onload = () =>{
  
            const link = fileReader.result;

            this.imagesLinks.push(link) ;

          }
          fileReader.readAsDataURL(files[i]);
        }

        const imagesElement = <HTMLElement>document.querySelector('.multiple-images');
        imagesElement.style.display = 'flex';
      }
    }



    

  }

  //Function that help to know if the product is create or edit for adult or not
  isProductForAdult(){
    this.isProductIsForAdult = !this.isProductIsForAdult;
  }

  //Function helping to know if the chossen category is a category that permit to deal with many sizes 
  onChangeCategory( event: any){
    this.isProductWithManySizes = event.value.withManySize;  
  }

  //Function help to retrieve all product from the database
  getAllCategories(){

    this.categoriesService.getCategories().subscribe(
      (result : any) => {
        if(result.success){

          this.categoriesList = result.message;

        }
      }
    )
  }

  //This function is use to initialise form when editing a category
  checkEditMode(){

    this.activatedRoute.params.subscribe(
      (params : any)=>{
        if(params.id){
        this.isEditMode = true;

        this.productsService.getProduct(params.id).subscribe(
          (result : any) => {

            if(result.success){

              //initialising first data when edit in order to kow if value have changes

              this.initialProductDataWhenEdit = result.message;

              if(result.message.category.withManySize){
                this.isProductWithManySizes = true;
              }

              if(!result.message.adult){
                this.isProductIsForAdult = false;
              }

              this.productForm.controls['nameProduct'].setValue(result.message.name);
              this.productForm.controls['priceProduct'].setValue(result.message.price);       
              this.productForm.controls['quantityProduct'].setValue(result.message.countInStock);       
              this.productForm.controls['imageVitrineProduct'].setValue(result.message.imageVitrine);       
              this.productForm.controls['categoryProduct'].setValue(result.message.category);       
              this.productForm.controls['forAdult'].setValue(result.message.adult);       
              this.productForm.controls['colorProduct'].setValue(result.message.color);       
              this.productForm.controls['detailsProduct'].setValue(result.message.details);       
              this.productForm.controls['topProduct'].setValue(result.message.topProduct);       
              this.productForm.controls['sexe'].setValue(result.message.sexe);       
              this.productForm.controls['sizeXS'].setValue(result.message.sizeXS);       
              this.productForm.controls['sizeS'].setValue(result.message.sizeS);       
              this.productForm.controls['sizeM'].setValue(result.message.sizeM);       
              this.productForm.controls['sizeL'].setValue(result.message.sizeL);       
              this.productForm.controls['sizeXL'].setValue(result.message.sizeXL);       
              this.productForm.controls['sizeXXL'].setValue(result.message.sizeXXL);       
              this.productForm.controls['imagesProduct'].setValue(result.message.images);       

              const imagePreviewed = <HTMLImageElement>document.getElementById('image-previewed');
              this.imageVitrineDisplay = `${result.message.imageVitrine}`;
              imagePreviewed.style.display = 'block';
          

              const imagesElement = <HTMLElement>document.querySelector('.multiple-images');

              for(let img of this.productForm.controls['imagesProduct'].value){
                this.imagesLinks.push(img);
              }
              
              imagesElement.style.display = 'flex';
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


  //Function that handle the save of un new product
  onSaveProduct(){

    this.isProductSaveButtonClicked = true;
    
    
    if(this.productForm.invalid){
      return; 
    }
    

    //Construction of the product to save base on productForm vales
    const newCreatedProductFormData = new FormData();

    newCreatedProductFormData.append('name', this.productForm.controls['nameProduct'].value);
    newCreatedProductFormData.append('imageVitrine', this.productForm.controls['imageVitrineProduct'].value);
    newCreatedProductFormData.append('adult', this.productForm.controls['forAdult'].value);
    newCreatedProductFormData.append('price', this.productForm.controls['priceProduct'].value);
    newCreatedProductFormData.append('color', this.productForm.controls['colorProduct'].value);
    newCreatedProductFormData.append('details', this.productForm.controls['detailsProduct'].value);
    newCreatedProductFormData.append('category', this.productForm.controls['categoryProduct'].value._id);
    newCreatedProductFormData.append('sexe', this.productForm.controls['sexe'].value);
    newCreatedProductFormData.append('topProduct', this.productForm.controls['topProduct'].value);
    
    for(let img of this.productForm.controls['imagesProduct'].value){
       newCreatedProductFormData.append('images', img);
    }


    if(this.isProductWithManySizes){

      newCreatedProductFormData.append('sizeXS', this.productForm.controls['sizeXS'].value);
      newCreatedProductFormData.append('sizeS', this.productForm.controls['sizeS'].value);
      newCreatedProductFormData.append('sizeM', this.productForm.controls['sizeM'].value);
      newCreatedProductFormData.append('sizeL', this.productForm.controls['sizeL'].value);
      newCreatedProductFormData.append('sizeXL', this.productForm.controls['sizeXL'].value);
      newCreatedProductFormData.append('sizeXXL', this.productForm.controls['sizeXXL'].value);

    }
    else{
      newCreatedProductFormData.append('countInStock', this.productForm.controls['quantityProduct'].value);
    }

    this.productsService.addProduct(newCreatedProductFormData)
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
    )
  
    
  }

  //Function that handle the modification of an old product
  onEditProduct(){

    this.isProductEditButtonClicked = true;

    //We have to insert modified value to the backend as the new data of the product
    //We accomplish this by verifying if a value on the form have been modified
    //if there is no modificatio we stay on the same formular and indicate to the user that he havn't modify anything but he tried to complete the modify action

    //here we have something particular
    //Depending on the category we choose there are some value appearing on the user screen;
    //We also have to manage this

    //So how we do it?
    //We compare every fields of the actual data form with the saved data of the current product when we first arrive on the page product. We have already stored those data on initialProductDataWhenEdit variable

    //We first compare field that are statics
    if(
        ( 
          !this.isImageVitrineEdit
          &&
          !this.isImagesArrayEdit
          &&
          this.productForm.controls['nameProduct'].value ==  this.initialProductDataWhenEdit.name
          &&
          this.productForm.controls['priceProduct'].value ==  this.initialProductDataWhenEdit.price
          &&
          this.productForm.controls['detailsProduct'].value ==  this.initialProductDataWhenEdit.details
          &&
          this.productForm.controls['topProduct'].value ==  this.initialProductDataWhenEdit.topProduct
          &&
          this.productForm.controls['colorProduct'].value ==  this.initialProductDataWhenEdit.color
          &&
          this.productForm.controls['forAdult'].value ==  this.initialProductDataWhenEdit.adult
          &&
          this.productForm.controls['sexe'].value ==  this.initialProductDataWhenEdit.sexe
        )
      )
      {

          //Then we compare dynamic fields, here in order if the user change the catégorie of the product
          //and if we are still on product with many sizes so that we can verify the nuber of product of thoses sizes or verify only to total
          if(this.productForm.controls['categoryProduct'].value._id ===  this.initialProductDataWhenEdit.category._id){
            if(this.productForm.controls['categoryProduct'].value.withManySize){

              if(
                this.productForm.controls['sizeXS'].value ==  this.initialProductDataWhenEdit.sizeXS
              &&
                this.productForm.controls['sizeS'].value ==  this.initialProductDataWhenEdit.sizeS
              &&
                this.productForm.controls['sizeM'].value ==  this.initialProductDataWhenEdit.sizeM
              &&
                this.productForm.controls['sizeL'].value ==  this.initialProductDataWhenEdit.sizeL
              &&
                this.productForm.controls['sizeXL'].value ==  this.initialProductDataWhenEdit.sizeXL
              &&
                this.productForm.controls['sizeXXL'].value ==  this.initialProductDataWhenEdit.sizeXXL
              ){
                
                this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
                return ;
              }
            }
            else{

              if(this.productForm.controls['quantityProduct'].value ==  this.initialProductDataWhenEdit.countInStock){
                this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
                return ;
              }
            }
          }
      }



      //Si les valeurs du formulaires sont invalides on ne va pas plus loin
      if(this.productForm.invalid){       
        return;
      }







    //Construction of the product with updated value to save
    //We only take data that have been modified
    const newCreatedProductFormData = new FormData();

    //Check if name product have been modified
    if(this.productForm.controls['nameProduct'].value !=  this.initialProductDataWhenEdit.name){
      newCreatedProductFormData.append('name', this.productForm.controls['nameProduct'].value);
    }

    //Check if price product have been modified
    if(this.productForm.controls['priceProduct'].value !=  this.initialProductDataWhenEdit.price){
      newCreatedProductFormData.append('price', this.productForm.controls['priceProduct'].value);
    }

    //Check if top product have been modified
    if(this.productForm.controls['topProduct'].value !=  this.initialProductDataWhenEdit.topProduct){
      newCreatedProductFormData.append('topProduct', this.productForm.controls['topProduct'].value);    
    }

    //Check if details product have been modified
    if(this.productForm.controls['detailsProduct'].value !=  this.initialProductDataWhenEdit.details){
      newCreatedProductFormData.append('details', this.productForm.controls['detailsProduct'].value);
    }

    //Check if color product have been modified
    if(this.productForm.controls['colorProduct'].value !=  this.initialProductDataWhenEdit.color){
      newCreatedProductFormData.append('color', this.productForm.controls['colorProduct'].value);
    }

    //Check if imageVitrine product have been modified
    if(this.productForm.controls['imageVitrineProduct'].value !=  this.initialProductDataWhenEdit.imageVitrine){
      newCreatedProductFormData.append('imageVitrine', this.productForm.controls['imageVitrineProduct'].value);
    }
    
    //Check if images array have changed 
    if(this.compareTwoArrays(this.productForm.controls['imagesProduct'].value, this.initialProductDataWhenEdit.images)){
      
      console.log("on a modifié les plusieurs images oooooooh");

      for(let img of this.productForm.controls['imagesProduct'].value){
              newCreatedProductFormData.append('images', img);

      }
    }

    //Check if forAdult product have been modified
    //If so, we check the new value
    //If the value have change from false to true, we take the choosen sex
    
    //If the value have not change, then we check if the sex have been modify
    //If so, we take that value
    if(this.productForm.controls['forAdult'].value !=  this.initialProductDataWhenEdit.adult){

      newCreatedProductFormData.append('adult', this.productForm.controls['forAdult'].value);

      if(this.productForm.controls['forAdult'].value == true){
        newCreatedProductFormData.append('sexe', this.productForm.controls['sexe'].value);
      }
      else{
        //In case we change for adult to false we set the value of sex to an empty string
        newCreatedProductFormData.append('sexe', '');

      }
    }
    else{
      if(this.productForm.controls['forAdult'].value == true){
        if(this.productForm.controls['sexe'].value !=  this.initialProductDataWhenEdit.sexe){
          newCreatedProductFormData.append('sexe', this.productForm.controls['sexe'].value);
        }
      }
    }

    //We check if the categorie have change
    //If so, we take the new one and we we check if it has change for a category allowing product of many sizes or not
    //If it has change for a category with only quantity we take the new quantity

    //if it has change for a category with many sizes
    //We check if those sizes have change in order to take them

    
    if(this.productForm.controls['categoryProduct'].value._id !=  this.initialProductDataWhenEdit.category._id){

      const val: any = 0;
      newCreatedProductFormData.append('countInStock', val);

      //If the category have change to many size we have to set the countInStock variable to zéro
      if(this.productForm.controls['categoryProduct'].value.withManySize){

        newCreatedProductFormData.append('sizeXS', this.productForm.controls['sizeXS'].value);


        if(this.productForm.controls['sizeXS'].value !=  this.initialProductDataWhenEdit.sizeXS){
          newCreatedProductFormData.append('sizeXS', this.productForm.controls['sizeXS'].value);
        }

        if(this.productForm.controls['sizeS'].value !=  this.initialProductDataWhenEdit.sizeS){
          newCreatedProductFormData.append('sizeS', this.productForm.controls['sizeS'].value);
        }

        if(this.productForm.controls['sizeM'].value !=  this.initialProductDataWhenEdit.sizeM){
          newCreatedProductFormData.append('sizeM', this.productForm.controls['sizeM'].value);
        }

        if(this.productForm.controls['sizeL'].value !=  this.initialProductDataWhenEdit.sizeL){
          newCreatedProductFormData.append('sizeL', this.productForm.controls['sizeL'].value);
        }

        if(this.productForm.controls['sizeXL'].value !=  this.initialProductDataWhenEdit.sizeXL){
          newCreatedProductFormData.append('sizeXL', this.productForm.controls['sizeXL'].value);
        }

        if(this.productForm.controls['sizeXXL'].value !=  this.initialProductDataWhenEdit.sizeXXL){
          newCreatedProductFormData.append('sizeXXL', this.productForm.controls['sizeXXL'].value);
        }

      }

      else{
        if(this.productForm.controls['quantityProduct'] != this.initialProductDataWhenEdit.countInStock){
          newCreatedProductFormData.append('countInStock', this.productForm.controls['quantityProduct'].value);
        }
      }
    }
    else{
      //if the category havn't change we check if we are on a product with many size or not
      //if so we take every change on sizes
      //if no we check if quantity have change if so we take change on quantity      
      if(this.productForm.controls['categoryProduct'].value.withManySize){
        if(this.productForm.controls['sizeXS'].value !=  this.initialProductDataWhenEdit.sizeXS){
          newCreatedProductFormData.append('sizeXS', this.productForm.controls['sizeXS'].value);
        }

        if(this.productForm.controls['sizeS'].value !=  this.initialProductDataWhenEdit.sizeS){
          newCreatedProductFormData.append('sizeS', this.productForm.controls['sizeS'].value);
        }

        if(this.productForm.controls['sizeM'].value !=  this.initialProductDataWhenEdit.sizeM){
          newCreatedProductFormData.append('sizeM', this.productForm.controls['sizeM'].value);
        }

        if(this.productForm.controls['sizeL'].value !=  this.initialProductDataWhenEdit.sizeL){
          newCreatedProductFormData.append('sizeL', this.productForm.controls['sizeL'].value);
        }

        if(this.productForm.controls['sizeXL'].value !=  this.initialProductDataWhenEdit.sizeXL){
          newCreatedProductFormData.append('sizeXL', this.productForm.controls['sizeXL'].value);
        }

        if(this.productForm.controls['sizeXXL'].value !=  this.initialProductDataWhenEdit.sizeXXL){
          newCreatedProductFormData.append('sizeXXL', this.productForm.controls['sizeXXL'].value);
        }
      }
      else{
        if(this.productForm.controls['quantityProduct'].value != this.initialProductDataWhenEdit.countInStock){

          newCreatedProductFormData.append('countInStock', this.productForm.controls['quantityProduct'].value);
        }
      }
    }



    this.productsService.editProduct(this.initialProductDataWhenEdit._id, newCreatedProductFormData)
    .subscribe(
      (result : any) =>{
  
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({severity:'success', detail: result.message});
          lastValueFrom(timer(2000))
          .then( 

            //après l'ajout d'une catégorie on revient à la liste
            () =>{ this.location.back()});
      
    },
    () =>{
      this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
    }
    )

  }

  //Function that help us to cancel on a product edition and navigate to the products list
  onCancelAddEditProduct(){

    this.router.navigateByUrl('produits');

  }

//Function helping to know if two arrays are equals
  compareTwoArrays(arr1: string[], arr2: string[]): boolean{
    
    let returnedValue = false;

    if(arr1.length != arr2.length){
      return true;
    }

    arr1.forEach( element  => {

      if(arr2.indexOf(element) == -1){
        returnedValue = true;
      }

    });

    return returnedValue;
  }

}
