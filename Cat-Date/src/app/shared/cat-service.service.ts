import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatType, Likes } from '../types/cat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  matches: Likes[] = [];
  newMatchId : string = ''
  isMatchFound:boolean = false
  allCatsShown: boolean = false;
  currentCat:CatType|undefined
  
  constructor(private http: HttpClient) { }

  // Create Like
  createLike(likerId: string, likedId: string){
    return this.http.post(environment.apiUrl+'/data/likes',{likerId,likedId})
  }

  // update likes
  updateMatches(catId: string, likedId: string) {
    this.http.get<CatType>(environment.apiUrl+'/data/cats/' + catId).subscribe((cat: CatType) => {
      const updatedCat = cat;
      updatedCat.matches.push(likedId);
      this.http.put(environment.apiUrl+'/data/cats/' + catId, updatedCat).subscribe(() => {
        console.log('Liked updated successfully');
      });
    });
  }
  // update swipes
  updateCatSwipes(catId: string, newSwipeIndex: number) {
    this.http.get<CatType>(environment.apiUrl+'/data/cats/' + catId).subscribe((cat: CatType) => {
      const updatedCat: CatType = { ...cat }; 
      
      // Update the catSwipeIndex with the new value
      updatedCat.catSwipeIndex = newSwipeIndex;
      this.http.put(environment.apiUrl+'/data/cats/' + catId, updatedCat).subscribe(() => {
        console.log('Cat swipe index updated successfully');
      });
    });
  }
  // Update timer
  updateTime(catId: string, currentTime: number) {
    this.http.get<CatType>(environment.apiUrl+'/data/cats/' + catId).subscribe((cat: CatType) => {
      const updatedCat: CatType = { ...cat }; 
      
      // Update the timeTillMatch with the new value
      updatedCat.timeTillMatches= currentTime;
      this.http.put(environment.apiUrl+'/data/cats/' + catId, updatedCat).subscribe(() => {
        console.log('Time till match updated successfully');
      });
    });
  }
  
  getLikes(): Observable<Likes[]> {
    return this.http.get<Likes[]>('http://localhost:3030/data/likes');
  }

  // check for match
  findMatches(cat:CatType) {
    this.getLikes().subscribe(likes => {
      const matches: Likes[] = [];
      let reciprocalMatch:any
      likes.forEach(like => {
        if(!cat.matches.includes(like.likedId) && !cat.matches.includes(like.likerId)){
            reciprocalMatch = likes.find(
            match => match.likerId === like.likedId && match.likedId === like.likerId);
        }
        if (reciprocalMatch) {
          if(!this.matches.includes(like)){
            if(cat._id == like.likerId){
              matches.push(like);
              this.isMatchFound = true
              this.newMatchId = like.likedId
              this.updateMatches(like.likerId,like.likedId)
            }
          }
        }
      });
      this.matches = matches;
    });
  }
  resetMatchState() {
    this.newMatchId = '';
    this.isMatchFound = false;
  }

  
}
