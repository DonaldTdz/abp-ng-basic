import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

import { IndexComponent } from './index.component';

const routes: Routes = [{
  path: '',
  component: LayoutDefaultComponent,
  children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent, data: { translate: 'index' } },
  ]
}];

@NgModule({
  imports: [
  RouterModule.forChild(routes)
  //RouterModule.forRoot(routes, { useHash: environment.useHash })
],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
