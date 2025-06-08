import { Routes } from "@angular/router";
import { AdvisoringRequestListComponent } from "./components/advisoring-request-list/advisoring-request-list.component";

export const AdvisoringRequestRouting: Routes = [
    {
        path: '',
        component: AdvisoringRequestListComponent,
    },
];