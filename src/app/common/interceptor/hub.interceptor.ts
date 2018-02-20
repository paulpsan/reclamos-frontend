import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HubInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // debugger;
    // console.log("modificando ");
    req = req.clone({
    setHeaders: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer " + localStorage.getItem('token')
      },
      // url: req.method === 'GET' ? req.url + '?tsp=' + Date.now() : req.url
    });

    // if (localStorage.getItem('token')) {
    //   console.log("sigo")
    //   req = req.clone({
    //     setHeaders: {
    //       "Content-Type": "application/json",
    //       // "Authorization": "Bearer " + localStorage.getItem('token')
    //     },
    //     url: req.method === 'GET' ? req.url + '?tsp=' + Date.now() : req.url
    //   });
    // }

    return next.handle(req)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~(event.status / 100) > 3) {
          // console.info('HttpResponse::event =', event, ';');
        } // else console.info('event =', event, ';');
          return event;
      })
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) {
          //   // El usuario no esta autorizado, ir a login
          //   localStorage.removeItem('token');
          //   this.router.navigate(['/login']);
          // } else if (err.status >= 500) {
          //   //TODO Need to close session, go to login and show error
          //   this.router.navigate(['/login']);
          // } else if (err.status === 0) {
          //   //TODO Need to close session, go to login and show error
          //   this.router.navigate(['/login']);
          // }
          return Observable.throw(err);
        }
      });
  }
}
