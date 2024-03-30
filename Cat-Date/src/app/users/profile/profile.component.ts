import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showEditMode: boolean = false;
  username1: string = '';
  email1: string = '';
  phone1: string = '';
  img: string | null = null
  catId : string = ''

  constructor(private authService: UserService, private fb: FormBuilder, private dataService: DataService) {}

  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    img: ['', [Validators.required]],
    eyesColor: ['', [Validators.required]],
    furColor: ['', [Validators.required]],
    weight: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const { username, phone, email } = this.authService.user!;
    this.username1 = username;
    this.phone1 = phone;
    this.email1 = email;
  }

  onToggle(): void {
    this.showEditMode = !this.showEditMode;
  }

  addACat(): void {
    if(this.profileForm.invalid){
      return
    }
    let { name, img, eyesColor, furColor, weight } = this.profileForm.value;
    img = img?.split('\\').pop() ?? null;
    img = '/assets/cat-images/'+img
    this.dataService.createACat(name!,img!, eyesColor!, furColor!, weight!)
      .subscribe((res) => {
        this.dataService.isCatAdded = !this.dataService.isCatAdded
        this.catId = localStorage.getItem('catId') as string
      });

  }
  isCatAdded(){
    return this.dataService.isCatAdded
  }
  deleteYourCat(id:string){
    this.dataService.deleteACat(id)
  }
  getYourCat(id:string){
    this.dataService.getYourCat(id).subscribe((res)=>{
      console.log(res)
    })
  }
  
}