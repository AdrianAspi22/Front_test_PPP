import { Routes } from "@angular/router";
import { RoleListComponent } from "./components/role-list/role-list.component";
import { PermissionUpdateComponent } from "./components/permission-update/permission-update.component";

export const roleRoutes: Routes = [
    {
      path: '',
      component: RoleListComponent
    
    },
    {
      path:'update-permissions',
      component:PermissionUpdateComponent
    }
];