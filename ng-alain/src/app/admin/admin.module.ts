import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { CreateUserComponent } from "./users/create-user/create-user.component";
import { RolesComponent } from './roles/roles.component';

//权限判断
import { AppRouteGuard } from '../shared/auth/auth-route-guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    AdminRoutingModule
  ],
  declarations: [ 
    UsersComponent,
    EditUserComponent,
    CreateUserComponent,
    RolesComponent
   ],
   providers: [ AppRouteGuard ]
})
export class AdminModule { }
