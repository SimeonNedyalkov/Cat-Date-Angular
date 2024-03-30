import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private authService:UserService,public dataService:DataService){}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((res)=>{
      console.log(res)
    })
    
  }
}
