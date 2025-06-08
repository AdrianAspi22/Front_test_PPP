import {Routes} from "@angular/router";
import {PrivateLayoutComponent} from "./layout/private-layout.component";
import {RoleGuard} from "../core/guards/role.guard.service";
import {HomeComponent} from "./home/home.component";

export const PrivateRoutes: Routes = [
    {
        path: '',
        component: PrivateLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home',
            },
            {
                path: 'home',
                canActivate: [RoleGuard],
                data: {requiredPermission: null},
                component: HomeComponent,
            },
            {
                path: 'advisoring-contract',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.AdvisoringContracts.Menu']},
                loadChildren: () => import('./advisoring-contract/adivoring-contract-routing.module').then(m => m.AdvisoringContractRouting)
            },
            {
                path: 'advisoring-request',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.AdvisoringRequests.Menu']},
                loadChildren: () => import('./advisoring-request/advisoring-request-routing.module').then(m => m.AdvisoringRequestRouting)
            },
            {
                path: 'research-area',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.ResearchAreas.Menu']},
                loadChildren: () => import('./researchs/research-area/research-area.module').then(m => m.ResearchAreaModule)
            },
            {
                path: 'research-group',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.ResearchGroups.Menu']},
                loadChildren: () => import('./researchs/research-group/research-group.module').then(m => m.ResearchGroupModule)
            },
            {
                path: 'research-line',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.ResearchLines.Menu']},
                loadChildren: () => import('./researchs/research-line/research-line.module').then(m => m.ResearchLineModule)
            },

            {
                path: 'google-calendar',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.GoogleCalendars.Menu']},
                loadChildren: () => import('./google-calendar/google-calendar.module').then(m => m.GoogleCalendarModule)
            },

            {
                path: 'research-company',
                loadChildren: () => import('./researchs/research-company/research-company.module').then(m => m.ResearchCompanyModule)
            },

            {
                path: 'research-line',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.GoogleCalendars.Menu']},
                loadChildren: () => import('./researchs/research-line/research-line.module').then(m => m.ResearchLineModule)
            },

            {
                path: 'users',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.Users.Menu']},
                loadChildren: () => import('./users/user.routes').then(m => m.userRoutes),
            },
            {
                path: 'roles',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.Roles.Menu']},
                loadChildren: () => import('./Management/role/role.module').then(m => m.RoleModule),
            },

            {
                path: 'icons',
                loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
            },
            {
                path: 'register',
                canActivate: [RoleGuard],
                data: {requiredPermission: ['Permissions.Actors.Menu']},
                loadChildren: () => import('./project/register/register.module').then(m => m.RegisterModule)
            },
        ]
    }
];