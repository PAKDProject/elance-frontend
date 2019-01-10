import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private endpoint: string = `${environment.backendUrl}/users/upload`
  constructor(
    private _http: HttpClient
  ) { }

  sendImage(fd: FormData) {
    return this._http.post(this.endpoint, fd, {
      headers: new HttpHeaders().set('Content-Type', "multipart/form-data")
    })
  }
}
