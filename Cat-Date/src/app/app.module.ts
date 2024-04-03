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
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { UserRoutingModule } from './users/users.routing.module';
import { AboutComponent } from './about/about.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { CatRoutingModule } from './c-d-items/catRouting.routing.module';
import { TipsComponent } from './tips/tips.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ComingSoonComponent,
    AboutComponent,
    AuthenticateComponent,
    TipsComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UsersModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,
    CatRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
