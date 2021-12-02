import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {

  //to automatically add that token to every request except if the request url contains "spotify.com"
  //we already add the correct token in this case.
  constructor(private auth: AuthService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("spotify.com")) {
      // clone the request and use the "setHeaders" property to set an "Authorization" header, etc.
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
