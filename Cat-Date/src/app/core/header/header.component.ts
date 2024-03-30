import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService:UserService,private router:Router){}

  get isLoggedIn():boolean{
    return this.userService.isLogged
  }
  get userName():string{
    return this.userService.user?.username || ""
  }
  logout(){
    this.userService.logout().subscribe((res)=>{
      this.router.navigate(['/home'])
    },(error) =>{
      alert('Something went wrong: '+error.message)
      this.router.navigate(['/login']);
    },)
    
  }
}
