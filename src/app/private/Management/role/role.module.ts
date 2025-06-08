import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { roleRoutes } from './role.routing';
import { RoleListComponent } from './components/role-list/role-list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes),
    HttpClientModule,
    RoleListComponent
  ]
})
export class RoleModule { }
