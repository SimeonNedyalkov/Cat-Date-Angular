import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CatType } from 'src/app/types/cat';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username1: string = '';
  email1: string = '';
  phone1: string = '';
  img: string | null = null
  liked:string[]=[]
  cat:any
  myCat : any
  doYouHaveACat:boolean = false
  constructor(private authService: UserService, private fb: FormBuilder, public dataService: DataService,private http:HttpClient) {}

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
    this.isCatAddedChecker()
    this.getMyCat().subscribe(res=>{
      if(res != undefined){
        console.log('My Cat :',res)
        this.myCat=res
        this.doYouHaveACat = true
      }
      else{
        this.doYouHaveACat = false
        console.log('You dont have a cat')
      }
    },err=>{
      console.log('You dont have a cat',err)
    })
  }

  addACat(): void {
  if(this.profileForm.invalid){
    return;
  }
  let { name, img, eyesColor, furColor, weight } = this.profileForm.value;
  img = img?.split('\\').pop() ?? null;
  img = '/assets/cat-images/' + img;
  this.dataService.createACat(name!, img!, eyesColor!, furColor!, weight!,this.liked)
    .subscribe((res) => {
      this.cat = res
      this.dataService.isCatAdded = !this.dataService.isCatAdded;
    });
}

  deleteYourCat(id:string){
    this.dataService.deleteACat(id).subscribe(res=>{
      console.log('cat deleted',res)
      this.dataService.isCatAdded = !this.dataService.isCatAdded
      this.profileForm.setValue({
        name: '',
        img:'',
        eyesColor:'',
        furColor:'',
        weight:''
      })
    },err=>{
      console.log(err.message)
    })
  }

  getMyCat(): Observable<CatType> {
    const user_id = this.authService.user?._id; // Get the current user's id
    return this.dataService.getAllCats().pipe(
      map((cats: any[]) => {
        return cats.find(cat => cat._ownerId === user_id);
      })
    );
  }

  isCatAddedChecker():void{
    
    this.dataService.getAllCats().subscribe((cats)=>{
      this.dataService.isCatAdded = cats.some(cat => cat._ownerId === this.authService.user?._id)
    },(err)=>{
      console.log(err)
    })}
  
  
  }