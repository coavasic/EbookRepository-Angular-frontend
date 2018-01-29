import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {HttpClient,HttpErrorResponse } from '@angular/common/http'
import { RequestOptions , ResponseContentType,Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  urlLogin = "http://localhost:8080/login";
  urlLogout = "http://localhost:8080/logout";
  urlSignUp = "http://localhost:8080/sign-up";


  constructor(private _http:HttpClient) { }


  doLogin(loginData){
    let contentHeader = new HttpHeaders();

    return this._http.post(this.urlLogin,loginData,{ headers: contentHeader, observe: 'response'});

    

  }

  logout(){

    return this._http.get(this.urlLogout);
  }

  signUp(signUpData){

    return this._http.post(this.urlSignUp,signUpData);

  }

}
