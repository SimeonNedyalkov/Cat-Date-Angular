import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatDateAppComponent } from './cat-date-app/cat-date-app.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { CDInterfaceComponent } from './c-d-interface/c-d-interface.component';
import { SwipeableDirective } from './swipable-directive.directive';
import { CatCardsComponent } from './cat-cards/cat-cards.component';
import { CatMatchDirectiveDirective } from './cat-match-directive.directive';



@NgModule({
  declarations: [
    CatDateAppComponent,
    ProfileInfoComponent,
    CatCardsComponent,
    CDInterfaceComponent,
    SwipeableDirective,
    CatMatchDirectiveDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[CatDateAppComponent,ProfileInfoComponent,CatCardsComponent,CDInterfaceComponent]
})
export class CDItemsModule { }
