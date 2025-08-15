import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable,tap } from 'rxjs';

@Injectable()
export class UserauthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("The user auth interceptor is ready to use..");
    const userInfoAuth = JSON.parse(localStorage.getItem("userInfo") || '[]');
    console.log("The auth-interceptor user info :", userInfoAuth);
    const _userRefreshToken = userInfoAuth._refreshToken;
    if(_userRefreshToken && request.url.includes('/user-logout')){
        console.log("The auth-interceptor user-info refresh token :", _userRefreshToken);
        request = request.clone({
          setHeaders: {'Authorization' : `Bearer ${_userRefreshToken}`}
        })
        console.log("The user-auth interceptor request : ", request);
    } 
    const _userAccessToken = userInfoAuth._accessToken;
    if(_userAccessToken){
      request = request.clone({
        setHeaders: {'_accesstoken' : _userAccessToken}
      })
    }
    
    return next.handle(request).pipe(
      tap (
        event => {
          if (event instanceof HttpResponse){
            console.log("Response Received : ", event);
          }
        }
      )
    );
  }
}
