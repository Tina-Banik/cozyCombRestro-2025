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
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("The auth interceptor is ready to use..");
    const adminInfoAuth = JSON.parse(localStorage.getItem("adminInfo") || '[]');
    console.log("The auth interceptor admin-info:", adminInfoAuth);
        const _authRefreshToken = adminInfoAuth._refreshToken;
        if(_authRefreshToken && request.url.includes('/admin-logout')){
          console.log("The auth interceptor admin-info refresh-token:", _authRefreshToken);
            request = request.clone({
            setHeaders: {'Authorization': `Bearer ${_authRefreshToken}`}
            // headers:request.headers.set("Authorization","Bearer " + _authRefreshToken)
        })
        console.log("The auth-interceptor request: " , request);
      }
      const _authAccessToken = adminInfoAuth._accessToken;
      console.log("The auth interceptor admin-info access-token:", _authAccessToken);
      /**add the access token for all the request */
      if(_authAccessToken){
        console.log("The auth interceptor admin-info access-token:", _authAccessToken);
        request = request.clone({
          setHeaders: {'_accesstoken' : _authAccessToken}
        })
      }
        return next.handle(request).pipe(tap(event => { if (event instanceof HttpResponse) { console.log("Response received:", event); } }));
  }
}