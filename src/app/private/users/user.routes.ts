import {Routes} from "@angular/router";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserRolesUpdateComponent} from "./components/user-roles-update/user-roles-update.component";

export const userRoutes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'user-role',
        component: UserRolesUpdateComponent
    },
];