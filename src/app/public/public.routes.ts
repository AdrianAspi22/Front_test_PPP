import {Routes} from "@angular/router";
import {PublicLayoutComponent} from "../core/ui/layout/public-layout.component";
import {LoginComponent} from "./auth/login/login.component";

export const PublicRoutes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
            }
        ],
    }
];