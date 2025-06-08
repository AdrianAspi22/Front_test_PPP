import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BreadcrumbsComponent} from "../../core/ui/breadcrumbs/breadcrumbs.component";

@Component({
    selector: 'app-home',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BreadcrumbsComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
// bread crumb items
    breadCrumbItems!: Array<{}>;

    constructor() {
    }

    ngOnInit(): void {
        /**
         * BreadCrumb
         */
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Welcome Page', active: true}
        ];
    }
}
