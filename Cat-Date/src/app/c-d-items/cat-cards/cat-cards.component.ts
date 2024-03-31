import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/shared/auth.service';
import { CatServiceService } from 'src/app/shared/cat-service.service';
import { DataService } from 'src/app/shared/data.service';
import { CatType } from 'src/app/types/cat';

@Component({
  selector: 'app-cat-cards',
  templateUrl: './cat-cards.component.html',
  styleUrls: ['./cat-cards.component.css']
})
export class CatCardsComponent implements OnInit {
  doYouHaveACat :boolean = false;
  myCat:any;
  cats: CatType[] = [];
  currentCatIndex: number = 0;
  currentCat: CatType | undefined;
  allCatsShown: boolean = false;
  swipeCooldown: number = 90 * 60; 
  catsMatched: boolean = false;
  constructor(private catService: DataService,private catLikeService:CatServiceService,private authService:UserService) {}

  ngOnInit(): void {
    this.catService.getAllCats().subscribe((res: CatType[]) => {
      this.cats = res.filter(cat => cat._ownerId !== this.authService.user?._id); 
      this.currentCat = this.cats[this.currentCatIndex];
      this.startSwipeCooldown();
      this.getMyCat().subscribe(res=>{
        if(res != undefined){
          console.log('My Cat :',res)
          this.myCat=res
          this.doYouHaveACat = true
        }
        else{
          this.doYouHaveACat = false
          console.log('You dont have a cat')
        }
      },err=>{
        console.log('You dont have a cat',err)
      })
    });
  }

  // next cat
  showNextCat() {
    if (this.currentCatIndex < this.cats.length - 1) {
      this.currentCatIndex++;
      this.currentCat = this.cats[this.currentCatIndex];
    } else {
      this.allCatsShown = true; 
    }
  }

  // Countdown
  startSwipeCooldown() {
    const timer = setInterval(() => {
      this.swipeCooldown--;
      if (this.swipeCooldown <= 0) {
        clearInterval(timer); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update every second (1000 milliseconds)
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

  // Likes and Dislikes

  like(id: string) {
    console.log(this.currentCat);
    console.log(this.myCat);
    
    this.catLikeService.createLike(id, this.currentCat?._id!).subscribe(() => {
      this.catLikeService.updateLiked(id, this.currentCat?._id!);
      this.checkForMatch()
      this.showNextCat();
    });
  }
  dislike(){
    console.log('disliked')
    this.showNextCat()
  }

  getCatId(){
    return this.myCat._id
  }
  getMyCat(): Observable<CatType> {
    const user_id = this.authService.user?._id; // Get the current user's id
    return this.catService.getAllCats().pipe(
      map((cats: any[]) => {
        return cats.find(cat => cat._ownerId === user_id);
      })
    );
  }
  // Match
  checkForMatch() {
    this.catLikeService.checkIfLiked(this.myCat._id, this.currentCat?._id!).subscribe(isMatched => {
      this.catsMatched = isMatched;
    });
  }
}