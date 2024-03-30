import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  constructor(private userService:UserService){}

  getUserName(){
    return this.userService.user?.username
  }
}
