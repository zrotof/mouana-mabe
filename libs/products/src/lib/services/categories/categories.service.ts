import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/eshop/mouana/api/v1/categories');
  }

  getCategoriesNames(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/eshop/mouana/api/v1/categories/get/names');
  }

  getCategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`http://localhost:3000/eshop/mouana/api/v1/categories/${categoryId}`);
  }

  addCategory(category: FormData){

    return this.http.post('http://localhost:3000/eshop/mouana/api/v1/categories', category);
  }

  
  editCategory(categoryId: string ,category: FormData): Observable<any>{


    return this.http.put<any>(`http://localhost:3000/eshop/mouana/api/v1/categories/${categoryId}`, category );
  }


  deleteCategory(categoryId: string): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/eshop/mouana/api/v1/categories/${categoryId}`);
  }
}
