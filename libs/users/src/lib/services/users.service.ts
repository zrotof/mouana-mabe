import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUser(userId: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  addUser(user: FormData){

    return this.http.post(`${this.apiUrl}/users`, user);
  }

  
  editUser(userId: string ,user: FormData): Observable<any>{


    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user );
  }


  deleteUser(userId: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  getUserTotal(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/get/count`);
  }
}
