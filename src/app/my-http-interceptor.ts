import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


console.log(req.url);
if(req.url=="http://localhost:8080/login" || req.url=="http://localhost:8080/sign-up" || req.url=="http://localhost:8080/open/categories/all"){
   return next.handle(req);
}

console.log("intercepted request ... ");


var currentUser = JSON.parse(localStorage.getItem('currentUser'));
var token1 = currentUser.token;

// Clone the request to add the new header.
const authReq = req.clone({ headers: req.headers.set("Authorization", token1)});


console.log("Sending request with new header now ...");

//send the newly created request
return next.handle(authReq)
.catch((error, caught) => {
//intercept the respons error and displace it to the console
console.log("Error Occurred");
console.log(error);
//return the error to the method that called it
return Observable.throw(error);
}) as any;
}
}