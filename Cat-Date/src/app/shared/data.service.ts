import { Injectable, OnInit } from '@angular/core';
// import {Firestore, collectionData} from '@angular/fire/firestore'
import {CatType } from '../types/cat';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit{

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
  getAllCats():Observable<CatType>{
    const url = 'http://localhost:3030/jsonstore/cats'
    return this.http.get<CatType>(url)
  }
  // add a new cat
  // addCat(cat : CatType){
  //   cat.id = this.firestore.createId()
  //   return this.firestore.collection('/listOfCats')
  // }

  // // get all Cats
  // getAllCats(){
  //   return this.afs.collection('/listOfCats').snapshotChanges()
  // }

  // // delete a Cat
  // deleteCat(cat:CatType){
  //   return this.afs.doc('/listOfCats/'+cat.id).delete()
  // }

  // // update Cat
  // updateCat(cat:CatType){
  //   this.deleteCat(cat)
  //   this.addCat(cat)
  // }
}
