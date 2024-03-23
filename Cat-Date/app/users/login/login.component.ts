import { Component,inject,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private catList:DataService){}
  createCatForm = this.fb.group({
    firstName:['',[]],
    eyesColor:['',[]],
    furColor:['',[]],
    weight:['',[]],
  })
  
  submitForm():void{
    if(!this.createCatForm){
      return
    }
    const form = this.createCatForm
    console.log(form)
    this.catList.getAllCats().subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log(err.message)
    })
    

  }
}
