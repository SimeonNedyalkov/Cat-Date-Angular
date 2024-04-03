import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  hasCooldownStarted:boolean = false
  swipeCooldown: number = 90 * 60; 

  constructor(private catService: DataService,public catLikeService:CatServiceService,private authService:UserService,private router:Router) {}

  ngOnInit(): void {
    this.resetCurrentCatIndex()
    this.hasCooldownStarted = false
    this.getMyCat().subscribe(res=>{
      if(res != undefined){
        this.myCat=res
        this.doYouHaveACat = true
        this.currentCatIndex = this.myCat.catSwipeIndex
        this.swipeCooldown = this.myCat.timeTillMatches
      }
      else{
        this.doYouHaveACat = false
        console.log('You dont have a cat')
      }
    },err=>{
      console.log('You dont have a cat',err)
    })
    this.catService.getAllCats().subscribe((res: CatType[]) => {
      this.cats = res.filter(cat => cat._ownerId !== this.authService.user?._id); 
      this.currentCat = this.cats[this.currentCatIndex];
      this.catLikeService.currentCat = this.cats[this.currentCatIndex];
      if(this.currentCat){
        this.catLikeService.allCatsShown=false
      }else{
        this.catLikeService.allCatsShown=true
        this.resumeSwipeCooldown(this.myCat._id)
      }
    })
  }

  // next cat
  showNextCat() {
    this.currentCatIndex++;
    if (this.currentCatIndex < this.cats.length) {
      if(this.cats[this.currentCatIndex]._id != this.myCat._id){
        this.currentCat = this.cats[this.currentCatIndex];
        this.catLikeService.currentCat = this.cats[this.currentCatIndex];
      }
    } else {
      this.catLikeService.allCatsShown = true; 
      if(this.hasCooldownStarted== false){
        this.startSwipeCooldown(this.myCat._id)
        this.hasCooldownStarted = true
      }
    }
    this.catLikeService.updateCatSwipes(this.myCat._id,this.currentCatIndex)
  }

  // Likes and Dislikes

  like(id: string) {
    this.catLikeService.createLike(id, this.currentCat?._id!).subscribe(() => {
      this.catLikeService.findMatches(this.myCat)
      if(this.catLikeService.isMatchFound == false){
        this.showNextCat()
      }
    });
  }
  dislike(){
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
  
  resetCurrentCatIndex() {
    this.currentCatIndex = 0;
  }
  // Countdown
  startSwipeCooldown(catId: string) {
    const timer = setInterval(() => {
      this.swipeCooldown--;
      if (this.swipeCooldown <= 0) {
        clearInterval(timer);
      }
      this.catLikeService.updateTime(catId,this.swipeCooldown)
    }, 1000); 
  
  }

// Function to resume timer from localStorage
resumeSwipeCooldown(catId: string) {
  debugger
const swipeCooldown = this.myCat.timeTillMatches
if (swipeCooldown) {
  this.swipeCooldown = swipeCooldown
  if (this.swipeCooldown > 0) {
    // If swipeCooldown is greater than zero, resume timer
    this.startSwipeCooldown(catId);
  }
}
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