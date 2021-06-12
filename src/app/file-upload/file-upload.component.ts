import { Component, OnInit } from '@angular/core';
import { BackendService } from '../Service/Backend.Service';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FileService } from '../Service/File.Service';

@Component({
  selector: 'app-FileUpload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileName: string | undefined;
  size:number | undefined;
  progress=0;
  fileUploading: boolean=false;
  message: string| undefined;
  DocumentType:string| undefined;
  url:string| undefined;
  tittle="Upload a file!";
  loading=false;

  uploadSub: Subscription | null | undefined;

  constructor(
    private server:BackendService,
    private service:FileService
    ) { }

  ngOnInit(): void {

  }



  onFileSelected(event: any) {
    this.fileUploading=true;
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name
      this.DocumentType = this.fileName.split('.').pop();


      const formData = new FormData();
      formData.append('file', file, this.fileName);

      const upload$ = this.server.UploadFile(formData).pipe(

        finalize(() => {
          this.progress = 100;
          this.message = 'Upload Complete';
          this.fileUploading = false;
        }),

        catchError(this.errorHandler)

      );

      this.uploadSub = upload$.subscribe((event: any) => {

        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          //console.log(this.progress );
          this.size = event.total;

        }
        else if (event.type === HttpEventType.Response) {
          //  console.log(event.body.dbPath);
          this.url = event.body.dbPath;
          this.service.urlDataFile(this.url);
        }
      })
    }
  }
  errorHandler(error: HttpErrorResponse) {
    console.log(error.message)
    return Observable.throw(error.message || "server error.");
  }


}
