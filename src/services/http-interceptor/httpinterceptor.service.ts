import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token = sessionStorage.getItem('access_token')
    if (access_token === null) {
      access_token = ""
    }
    const customReq = request.clone({
      headers: request.headers
        .set('Authorization', access_token)
    })


    return next.handle(customReq).pipe(tap((ev: HttpEvent<any>) => {
      if (ev instanceof HttpResponse) {
        if (ev.headers.get('X-Auth-Tokens') !== null) {
          let tokens = JSON.parse(ev.headers.get('X-Auth-Tokens'))

          sessionStorage.setItem('access_token', tokens.access_token)
          sessionStorage.setItem('id_token', tokens.id_token)
        }
      }
    }))

  }
}
