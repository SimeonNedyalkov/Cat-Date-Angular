import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authService:UserService){}
  ngOnInit(): void {
    this.authService.getProfile().subscribe((res)=>{
      console.log(res)
    })
    
  }
}
