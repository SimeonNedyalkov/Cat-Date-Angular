import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './error/error.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UsersModule } from './users/users.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleModule } from './shared/module.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { UserRoutingModule } from './users/users.routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UsersModule,
    ReactiveFormsModule,
    ModuleModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
