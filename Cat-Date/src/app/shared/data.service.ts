import { Injectable, OnInit } from '@angular/core';
// import {Firestore, collectionData} from '@angular/fire/firestore'
import {CatType } from '../types/cat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit{
  isCatAdded:boolean=false
  url = 'http://localhost:3030/data/cats'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  // Read
  getAllCats(): Observable<CatType[]> {
    return this.http.get<CatType[]>(this.url);
  }
  getYourCat(id:string): Observable<CatType>{
    return this.http.get<CatType>(this.url+`/${id}`);
  }
  
  // Create
  createACat(name: string, img: string, eyesColor: string,furColor:string,weight:string,liked:string[]) {{
    return this.http.post<CatType>(this.url,{
      name,
      img,
      eyesColor,
      furColor,
      weight,
      liked,
    }).pipe(
      tap((response: any) => {
        const id = response._id;
      })
    );
  }
  }
  // Delete
  deleteACat(id:string){
  return this.http
  .delete<string>(this.url+`/${id}`)
  .pipe(tap((response:any)=>{
  }))
}
  // Update

}
