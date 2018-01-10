import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [IndexComponent]
})
export class HomeModule { }
