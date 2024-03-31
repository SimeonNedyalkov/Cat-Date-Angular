import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './users.routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor.interceptor';
import { CDItemsModule } from '../c-d-items/c-d-items.module';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CDItemsModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    UserRoutingModule
  ],providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
]
})
export class UsersModule {
 }
