import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        let string1: String[] = req.url.split("/");

        if (string1.includes("login") || string1.includes("open") || string1.includes("sign-up")) {
            return next.handle(req);
        }

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token1 = currentUser.token;

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("Authorization", token1) });

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