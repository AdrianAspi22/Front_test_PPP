import {SweetalertsComponent} from "./sweetalerts/sweetalerts.component";
import {TourComponent} from "./tour/tour.component";
import {Routes} from "@angular/router";

export const AdvanceUiRoutes: Routes = [
    {
        path: "sweetalerts",
        component: SweetalertsComponent
    },
    {
        path: "tour",
        component: TourComponent
    },
];