import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  subjectName = new Subject<any>(); 

  urlDataFile(url: any) {
    this.subjectName.next({ data: url });
  }
}