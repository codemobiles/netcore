import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

// import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem(environment.keyLocalAuthenInfo)

    if (jwtToken != null) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'bearer ' + jwtToken)
      });

      // simple way
      return next.handle(cloned);

      // Intercept response too
      // npm i rxjs-compat
      // return next.handle(cloned).do(
      //   (event: HttpEvent<any>) => {
      //     if (event instanceof HttpResponse) {
      //       // do stuff with response if you want
      //     }
      //   },
      //   (err: any) => {
      //     if (err instanceof HttpErrorResponse) {
      //       if (err.status === 403 || err.status === 500) {
      //         // redirect to the login route or show a modal 'Token is not valid'
      //         //localStorage.setItem(environment.keyLocalAuthenInfo, null);
      //         //this.router.navigate(['/login']);
      //       }
      //     }
      //   }
     // );
    } else {
      return next.handle(req);
    }
  }
}
