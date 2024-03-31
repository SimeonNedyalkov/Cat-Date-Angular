import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  placeholderText: string = '<i class="fa-solid fa-envelope"></i> Type your email';
  constructor(private fb:FormBuilder, private userService:UserService,private router:Router){}
  
  registerForm = this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)]],
    phone:['',[Validators.required]],
    password:['',[Validators.required, Validators.minLength(6)]],
    rePassword:['',[Validators.required]]
}, {
  validators: this.passwordMatchValidator
})
submitForm(){
  if(this.registerForm.invalid){
    return
  }
  const form = this.registerForm.value
  if(form.password == form.rePassword){
    const {username,email,password,phone,rePassword} = this.registerForm.value
    
    if(password == rePassword){
      this.userService.register(username!, email!, phone!, password!, rePassword!)
      .subscribe((res)=>this.router.navigate(['/login']))
  }
}}

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }
}
