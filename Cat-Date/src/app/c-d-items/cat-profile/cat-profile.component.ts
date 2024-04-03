import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { CatType } from 'src/app/types/cat';

@Component({
  selector: 'app-cat-profile',
  templateUrl: './cat-profile.component.html',
  styleUrls: ['./cat-profile.component.css']
})
export class CatProfileComponent {
  name: string = '';
  eyesColor: string = '';
  furColor: string = '';
  weight:string=''
  img: string | null = null
  matches:string[]=[]
  myCatId : string  = ''
  cat:any
  myCat : any
  myCatMatches :string[]=[]
  myCatSwipeIndex : number = 0
  constructor(private fb: FormBuilder, public dataService: DataService,private http:HttpClient,private authService:UserService,private router:Router) {}

  catProfileForm = this.fb.group({
    name: [`${this.name}`, [Validators.required]],
    img: [``, [Validators.required]],
    eyesColor: [`${this.eyesColor}`, [Validators.required]],
    furColor: [`${this.furColor}`, [Validators.required]],
    weight: [`${this.weight}`, [Validators.required]],
  });

  ngOnInit(): void {
    this.getMyCat().subscribe(res=>{
      this.name = res.name
      this.eyesColor = res.eyesColor
      this.furColor = res.furColor
      this.weight = res.weight
      this.img = res.img
      this.myCatId = res._id
      this.myCatMatches = res.matches
      this.myCatSwipeIndex = res.catSwipeIndex
    },err=>{
      console.log('You dont have a cat',err)
    })
  }


  getMyCat(): Observable<CatType> {
    const user_id = this.authService.user?._id; 
    return this.dataService.getAllCats().pipe(
      map((cats: any[]) => {
        return cats.find(cat => cat._ownerId === user_id);
      })
    );
  }
  
  updateYourCat(){
    if(this.catProfileForm.invalid){
      return;
    }
    let { name, img, eyesColor, furColor, weight } = this.catProfileForm.value;
    img = img?.split('\\').pop() ?? null;
    img = '/assets/cat-images/' + img;
    this.dataService.updateYourCat(this.myCatId,name!, img!, eyesColor!, furColor!, weight!,this.myCatMatches,this.myCatSwipeIndex)
      .subscribe((res) => {
        this.cat = res
        this.router.navigate(['/dashboard'])
      });
  }
}
