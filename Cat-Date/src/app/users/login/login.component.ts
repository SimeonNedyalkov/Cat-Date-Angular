import { Component,inject,ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private catList:DataService ,private authService:UserService,private router:Router){}
    loginForm = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
  })
  submitForm(){
    if(this.loginForm.invalid){
      return
    }
    const {email,password} = this.loginForm.value;
    this.authService.login(email!,password!).subscribe((res)=>{
      this.router.navigate(['/home'])
      console.log(res)
    })
  }
  
}
