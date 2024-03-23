import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { CatType } from 'src/app/types/cat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  catList : CatType[] = []

  constructor(private authService:AuthService,public dataService:DataService){}

  ngOnInit(): void {
    
  }
}
