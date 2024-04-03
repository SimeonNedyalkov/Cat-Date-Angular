import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatDateAppComponent } from './cat-date-app/cat-date-app.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CDInterfaceComponent } from './c-d-interface/c-d-interface.component';
import { CatCardsComponent } from './cat-cards/cat-cards.component';
import { CatRoutingModule } from './catRouting.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CatProfileComponent } from './cat-profile/cat-profile.component';
import { CheckCatComponent } from './check-cat/check-cat.component';
import { AddClassDirective } from './add-class.directive';



@NgModule({
  declarations: [
    CatDateAppComponent,
    ProfileInfoComponent,
    CatCardsComponent,
    CDInterfaceComponent,
    CatProfileComponent,
    CheckCatComponent,
    AddClassDirective
  ],
  imports: [
    CommonModule,
    CatRoutingModule,
    ReactiveFormsModule
  ],
  exports:[CatDateAppComponent,ProfileInfoComponent,CatCardsComponent,CDInterfaceComponent]
})
export class CDItemsModule { }
