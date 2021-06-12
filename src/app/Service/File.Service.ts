import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  subjectName = new Subject<any>(); 

  urlDataFile(url: any) {
    // console.log(url);
    this.subjectName.next({ data: url });
  }
}