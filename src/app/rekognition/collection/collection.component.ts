import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {


  faces=[]
  faceIds = []
  faceId:string
  isDelete:boolean
  id:string
  checkbox:boolean
  top:number
  constructor(private http:HttpClient) {
   }

  ngOnInit(): void {
    this.getFaces()
  }

  getFaces(){
    this.http.get(`${environment.url}/collection`).subscribe((res:{collection:[]}) => {
      this.faces = res.collection
      this.faces.map(item => item.ExternalImageId = item.ExternalImageId.replace('_','|'))
      .sort((a, b) => {
				if (a.ExternalImageId < b.ExternalImageId) return -1;
				if (a.ExternalImageId > b.ExternalImageId) return 1;
				return 0;
			})
      let id = localStorage.getItem('id')
      console.log(id)
      if (localStorage.getItem('role') != 'admin') this.faces = this.faces.filter(face => face.ExternalImageId === id)
      console.log(this.faces)
    })
  }

  deleteFace(){
    this.isDelete = true
    document.getElementById('faces').style.opacity="0.5"
  }

  upateFaceIds(event,faceId){
    let isChekecd = event.currentTarget.checked;
    if (isChekecd) this.faceIds.push(faceId)
    else this.faceIds = this.faceIds.filter(faceID => faceID !== faceId)
    console.log(this.faceIds)
  }

  validDelete(){
    
    // this.http.delete(`${environment.url}/delete-face`, {params:{id:this.faceIds}}).subscribe((res) => {
      this.http.delete(`${environment.url}/delete-face`, { params: { id: this.faceIds } }).subscribe((res) => {
      console.log(res)
      this.getFaces()
    })
    console.log(this.faceId)
    this.isDelete = false
    document.getElementById('faces').style.opacity="1"
    this.faceIds.length = 0
  }

  cancelDelete(){
    this.isDelete = false 
    document.getElementById('faces').style.opacity="1"
  }

  searchID(){
    console.log(this.id)
    if (this.id !== "")  this.faces = this.faces.filter(data => data.ExternalImageId === this.id)
    else this.getFaces()
  }
  
}
