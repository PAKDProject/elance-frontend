import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private endpoint: string = `${environment.backendUrl}/users/avatar-upload`
  constructor(
    private _http: HttpClient
  ) { }

  sendImage(base64Image: string, userId: string) {
    var image = {
      "id": userId,
      "image": base64Image
    }
    return this._http.post(this.endpoint, JSON.stringify(image), {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      reportProgress: true,
      observe: 'events'
    })
  }
}
