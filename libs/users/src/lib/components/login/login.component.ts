import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isLoginFormSubmitted = false;

  //tese group of variables will help to display the correct message rerror comming from the DB
  isEmailIsNotRecognizedByTheDB = false;
  isPasswordIsNotRecognizedByTheDB = false;
  isServerError = false;


  emailErrorMessage = '';
  passwordErrorMessage ='';
  generalErrorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private route: Router) { 

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['',Validators.required]
      });

    }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }

  //Function that permit us to easely have our form controls
  get loginFormControls(){
    return this.loginForm.controls;
  }

  onLogin(){

    this.isLoginFormSubmitted = true;

    //We set them to false in order to not display any message on submit button
    //We will wait for the backend result
    this.isEmailIsNotRecognizedByTheDB = false;
    this.isPasswordIsNotRecognizedByTheDB = false;
    this.isServerError = false;
/*
    if(this.loginForm.invalid){
      return ;
    }
*/


    const userLoginData = {
      email:this.loginForm.controls['email'].value,
      password:this.loginForm.controls['password'].value
    };

   
    this.authService.login(userLoginData)
    .subscribe(
      (result: any) =>{

        this.localstorageService.setToken(result.message.token);
        this.route.navigateByUrl('');
      },
      (err ) =>{

        console.log("err.error.message.includes('email') ", err.error.message.includes('email'))
        console.log("err.error.message.includes('passe') ", err.error.message.includes('passe'))

        if(err.error.message.includes('mail')){
          this.isEmailIsNotRecognizedByTheDB = true;

          this.emailErrorMessage = err.error.message
        }

        else if(err.error.message.includes('passe')){
          this.isPasswordIsNotRecognizedByTheDB = true;

          this.passwordErrorMessage = err.error.message

        }

        else{
          this.isServerError = true;
          this.generalErrorMessage = 'Erreur serveur, veuillez re-essayer plus tard'

        }



      }
    );

  }

}
