import { Routes } from "@angular/router";
import { AdvisoringContractListComponent } from "./components/advisoring-contract-list/advisoring-contract-list.component";
import { AdvisoringContractRegisterComponent } from "./components/advisoring-contract-register/advisoring-contract-register.component";


export const AdvisoringContractRouting: Routes = [
    {
        path: '',
        component: AdvisoringContractRegisterComponent,
    },

    {
        path: '',
        component: AdvisoringContractListComponent,
    },
];