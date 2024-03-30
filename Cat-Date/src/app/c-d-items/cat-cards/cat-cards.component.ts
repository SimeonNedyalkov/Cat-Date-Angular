import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { CatType } from 'src/app/types/cat';

@Component({
  selector: 'app-cat-cards',
  templateUrl: './cat-cards.component.html',
  styleUrls: ['./cat-cards.component.css']
})
export class CatCardsComponent implements OnInit {
  
  cats: CatType[] = [];
  
  currentCatIndex: number = 0;
  currentCat: CatType | undefined;
  allCatsShown: boolean = false;
  swipeCooldown: number = 90 * 60; 

  constructor(private catService: DataService) {}

  ngOnInit(): void {
    this.catService.getAllCats().subscribe((res: CatType[]) => {
      this.cats = res; 
      this.currentCat = this.cats[this.currentCatIndex];
      this.startSwipeCooldown();
    });
  }

  showNextCat() {
    if (this.currentCatIndex < this.cats.length - 1) {
      this.currentCatIndex++;
      this.currentCat = this.cats[this.currentCatIndex];
    } else {
      this.allCatsShown = true; // All cats have been shown
    }
  }

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
  
}