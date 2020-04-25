import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private authService : AuthService
  ) { }

  intercept(req, next){
    var tokenizeReq = req.clone({
      setHeaders:{
        Authorization: 'Bearer ${this.authService.getToken()}'
      }
    })
    return next.handle(tokenizeReq);
  }
}
