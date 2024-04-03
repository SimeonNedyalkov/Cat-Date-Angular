import { Component, OnInit, } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';
import { CatServiceService } from 'src/app/shared/cat-service.service';
import { DataService } from 'src/app/shared/data.service';
import {  CatType, Likes } from 'src/app/types/cat';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  
  myCat: any;
  likedCats:CatType[]=[]

  constructor(
    private userService: UserService,
    public catLikeService: CatServiceService,
    public dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getCat()
  }
  
  getMatches(): Likes[] {
    return this.catLikeService.matches;
  }
  isNewMatch(): boolean {
    return this.catLikeService.isMatchFound;
  }

  getCat(): void {
    this.dataService.getMyCat().subscribe((res) => {
        if (res) {
            this.myCat = res;
            if (res._id) {
                this.myCat.matches.forEach((matchId:string) => {
                    this.dataService.getYourCat(matchId).subscribe(cat => {
                        this.likedCats.push(cat); 
                    });
                });
            } else {
                console.error("'_id' property is missing in the response:", res);
                
            }
        } else {
            console.error("Response is undefined or null");
        }
    });
}
  

  getUserName() {
    return this.userService.user?.username;
  }
}