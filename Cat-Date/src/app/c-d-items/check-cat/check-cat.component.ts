import { Component, OnInit } from '@angular/core';
import { CatServiceService } from 'src/app/shared/cat-service.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-check-cat',
  templateUrl: './check-cat.component.html',
  styleUrls: ['./check-cat.component.css']
})
export class CheckCatComponent implements OnInit{
  constructor(private dataService:DataService,public catLikeService:CatServiceService){}
    ngOnInit(): void {
      
    } 
}
