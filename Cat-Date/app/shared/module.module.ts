import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class ModuleModule {
  constructor(private dataService:DataService,private authService:AuthService){}
 }
