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
  swipeCooldown: number = 90 * 60; 
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

  // Countdown
  startSwipeCooldown() {
    const timer = setInterval(() => {
      this.swipeCooldown--;
      if (this.swipeCooldown <= 0) {
        clearInterval(timer); 
      }
    }, 1000); 
  }

  // Helper function to format seconds into HH:MM:SS
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  // Helper function to pad single digits with leading zero
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
