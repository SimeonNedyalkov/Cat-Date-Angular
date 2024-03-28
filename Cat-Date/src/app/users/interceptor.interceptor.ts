import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService:UserService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: any = this.userService.getToken();
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json',
      },
    })
    if(accessToken){
      const authenticatedRequest = req.clone({setHeaders: {
        'Content-Type' : 'application/json',
        'x-authorization': `${this.userService.getToken()}`,
      }});
      return next.handle(authenticatedRequest)
    }else{
      return next.handle(req);
    }

    
  }
}