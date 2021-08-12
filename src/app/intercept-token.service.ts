import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService {

  constructor(private a:AuthService) { }

  // Methods

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
   

    if (!request.url.includes("spotify.com")) {
      // clone the request and use the "setHeaders" property to set an "Authorization" header, etc.
      request = request.clone({
        setHeaders: 
        {
          Authorization: `JWT ${this.a.getToken()}` //will grab our token when user logs in and uses it for authentification
        }
      });
    }
    // Pass the request on to the next handler
    return next.handle(request);
  }
}
