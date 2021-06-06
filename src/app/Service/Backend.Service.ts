import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  UploadFile(formData: any): Observable<any> {

    //calling the server and manage the file
    //Important: return a Url or string! =)
    return this.httpClient.post("ypurAPIUrl/UploadFile", formData, {
      reportProgress: true,
      observe: 'events'
    })


  }
}