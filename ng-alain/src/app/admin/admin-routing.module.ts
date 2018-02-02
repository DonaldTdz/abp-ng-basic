import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { UsersComponent } from './users/users.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [
  {
      path: '',
      component: LayoutDefaultComponent,
      children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          { path: 'users', component: UsersComponent, data: { translate: 'users', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
          { path: 'roles', component: UsersComponent, data: { translate: 'roles', permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
          { path: 'tenants', component: UsersComponent, data: { translate: 'tenants', permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
