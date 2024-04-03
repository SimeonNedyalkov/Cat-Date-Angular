import { Injectable } from '@angular/core';
import {CatType } from '../types/cat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, map, tap } from 'rxjs';
import { UserService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cat$$ = new BehaviorSubject<CatType | undefined>(undefined);
  private cat$ = this.cat$$.asObservable();
  cat: CatType | undefined;
  catSubscription: Subscription;

  isCatAdded:boolean=false
  url = 'http://localhost:3030/data/cats'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http:HttpClient,private authService:UserService) { 
    this.catSubscription = this.cat$.subscribe((cat) => {
      this.cat = this.cat;
    });}

  // Read
  getAllCats(): Observable<CatType[]> {
    return this.http.get<CatType[]>(this.url);
  }
  getYourCat(id:string): Observable<CatType>{
    return this.http.get<CatType>(this.url+`/${id}`)
  }
  getMyCat(): Observable<CatType> {
    const user_id = this.authService.user?._id; 
    return this.getAllCats().pipe(
      map((cats: any[]) => {
        return cats.find(cat => cat._ownerId === user_id);
      })
    );
  }
  
  // Create
  createACat(name: string, img: string, eyesColor: string,furColor:string,weight:string,matches:string[],catSwipeIndex:number,timeTillMatches:number) {{
    return this.http.post<CatType>(this.url,{
      name,
      img,
      eyesColor,
      furColor,
      weight,
      matches,
      catSwipeIndex,
      timeTillMatches
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

  updateYourCat(id:string, name:string, img:string, eyesColor:string, furColor:string, weight:string,matches:string[],catSwipeIndex:number,timeTillMatches:number){
    return this.http.put<CatType>(this.url+`/${id}`,{
      name,
      img,
      eyesColor,
      furColor,
      weight,
      matches,
      catSwipeIndex,
      timeTillMatches
    })
  }
}
