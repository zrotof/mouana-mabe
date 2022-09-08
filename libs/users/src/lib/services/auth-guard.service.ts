import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})

//the authgard is use to guard access to some part of our application
//For that we implement Canactivate interface that provide us a way to give or refuse access to a user
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
    ) { }


    //This methode return an observable (true or false) response in order to let know if the route is reachable or not
    //We get token, get the payload and verify user data
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);
      if(tokenDecode.isAdmin && !this.isTokenExpired(tokenDecode.exp)){
        return true;
      }
    }

    this.router.navigate(['/connexion']);
    return false;
  }


  isTokenExpired(expirationTime: any) {
    return Math.floor(new Date().getTime() / 1000)>= expirationTime;
  }


}
