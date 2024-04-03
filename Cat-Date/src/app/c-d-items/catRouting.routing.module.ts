import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatProfileComponent } from './cat-profile/cat-profile.component';
import { CheckCatComponent } from './check-cat/check-cat.component';
import { catGuard } from '../guards/cat-guard.guard';


const routes: Routes = [
    {path:'cat-profile',component:CatProfileComponent},
    {path:'check-match',component:CheckCatComponent,canActivate:[catGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatRoutingModule { }