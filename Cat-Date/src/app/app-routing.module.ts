import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'coming-soon',component:ComingSoonComponent},
  {path:'about',component:AboutComponent},
  {path:'**',redirectTo:'/error'},
  {path:'error',component:ErrorComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
