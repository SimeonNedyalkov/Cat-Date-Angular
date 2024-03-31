import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CatType, Likes } from '../types/cat';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  private catLike$$ = new BehaviorSubject<Likes | undefined>(undefined);
  constructor(private http: HttpClient) { }

  // Create Like
  createLike(likerId: string, likedId: string){
    return this.http.post(environment.apiUrl+'/data/likes',{likerId,likedId})
  }

  // update likes

  updateLiked(catId: string, likedId: string) {
    this.http.get<CatType>(environment.apiUrl+'/data/cats/' + catId).subscribe((cat: CatType) => {
      // Get the cat data
      const updatedCat = cat;
      
      // Push the likedId to the liked array
      updatedCat.liked.push(likedId);
      // Update the cat data in the database
      this.http.put(environment.apiUrl+'/data/cats/' + catId, updatedCat).subscribe(() => {
        // Log success or handle it as needed
        console.log('Liked updated successfully');
      });
    });
  }

  // Check for matches
  checkForMatch(likerId: string, likedId: string) {
    this.http.get<any>(environment.apiUrl+'/data/cats/' + likedId).subscribe((likedCat: any) => {
      // Check if the likerId is in the likedBy array of the liked cat
      if (likedCat.liked.includes(likerId)) {
        console.log('It\'s a match!');
        // You can handle the match here, such as displaying it to the user
      }
    });
  }
  getLikes(): Observable<Likes[]> {
    return this.http.get<Likes[]>('http://localhost:3030/data/likes');
  }
  checkIfLiked(cat1Id: string, cat2Id: string): Observable<boolean> {
    return this.getLikes().pipe(
      map(likes => this.checkLikesForMatch(likes, cat1Id, cat2Id))
    );
  }
  private checkLikesForMatch(likes: any[], cat1Id: string, cat2Id: string): boolean {
    return likes.some(like =>
      (like.likerId === cat1Id && like.likedId === cat2Id) ||
      (like.likerId === cat2Id && like.likedId === cat1Id)
    );
  }
}
