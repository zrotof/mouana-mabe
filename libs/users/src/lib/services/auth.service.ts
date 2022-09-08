import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient,
    private localstorageServie: LocalstorageService,
    private router: Router) { }


  login(loginInfo : any): Observable<User>{

    return this.http.post<User>('http://localhost:3000/eshop/mouana/api/v1/users/login',loginInfo);
  }

  logout(){
    this.localstorageServie.removeToken();
    this.router.navigate(['/connexion'])
  }

}
