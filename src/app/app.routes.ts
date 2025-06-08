import {Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'private',
    },
    {
        path: 'private',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./private/private.routes').then(p => p.PrivateRoutes),
            },
        ],
    },
    {
        path: 'login',
        children: [
            {
                path: '',
                loadChildren: () => import('./public/public.routes').then(m => m.PublicRoutes),
            },
        ],
    },
];
