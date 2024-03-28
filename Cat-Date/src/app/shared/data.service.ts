import { Injectable, OnInit } from '@angular/core';
// import {Firestore, collectionData} from '@angular/fire/firestore'
import {CatType } from '../types/cat';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit{
  url = 'http://localhost:3030/data/cats'
  headers = new HttpHeaders({
    'Content-Type': 'application/json', // Set the content type to JSON
  });
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  getAllCats():Observable<CatType>{
    return this.http.get<CatType>(this.url)
  }
  createACat(catData:CatType):Observable<CatType>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });
    return this.http.post<CatType>(this.url,catData,{headers})
  }
}
