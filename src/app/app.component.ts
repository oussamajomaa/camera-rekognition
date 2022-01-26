import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public token:string
  constructor (private activatedRoute: ActivatedRoute, private http:HttpClient){
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.token = params.token
    //   if (params.token)  {
    //     localStorage.setItem('token',params.token)
    //     localStorage.setItem('role','admin')
    //   }
    // });

    localStorage.setItem('id',"auth0|123325478960")
    localStorage.setItem('role','admin')


  }
   // latest snapshot
   public webcamImage: WebcamImage = null;

   handleImage(webcamImage: WebcamImage) {
     this.webcamImage = webcamImage;
   }

   ngOnInit(): void {
     
  }

   
}
