import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '../Service/File.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  private subscription!: Subscription;
  fileUrl: string|undefined;
  addFile=false;

  constructor(
    private fileService: FileService

  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  AddFile() {
  //  console.log('Adding File');
    this.addFile=true;
    
    this.subscription = this.fileService.subjectName.subscribe((url: any) => {
      this.fileUrl = "Your file was saved on: " +url.data;
      // console.log(this.fileUrl);
    })
  }
}
