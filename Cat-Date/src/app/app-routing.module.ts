import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'coming-soon',component:ComingSoonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
