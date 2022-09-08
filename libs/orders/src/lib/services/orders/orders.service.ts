import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }


  getOrders(){
    return ;
  }

  getTotalOrders(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/orders/get/count`);
  }
}
