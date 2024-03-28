import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import {  UserService } from './auth.service';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[LoaderComponent]
})
export class SharedModule {
  constructor(private dataService:DataService,private authService:UserService){}
 }
