import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  //If category is not defined we retrieve all products
  //else we retrieve products of the category
  getProducts( categoryId?: number): Observable<any[]>{

    console.log("inside service")

    if(!categoryId){
      console.log("catergoryId: rien")

      return this.http.get<any[]>(`${this.apiUrl}/products`);
    }

    else{

      console.log("catergoryId: oui")

      return this.http.get<any[]>(`${this.apiUrl}/products/category/${categoryId}`);
    }

  }



  getProduct(productId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }



  addProduct(product: FormData){
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  
  editProduct(productId: string ,product: FormData): Observable<any>{


    console.log("ici")
    return this.http.put<any>(`${this.apiUrl}/products/${productId}`, product );
  }


  deleteProduct(productId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`);
  }


  getProductTotal(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/products/get/count`);
  }


  getTopProducts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/products/get/featured`)
  }
}
