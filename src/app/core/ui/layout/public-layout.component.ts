import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.component.html',
    imports: [
        RouterOutlet
    ],
    standalone: true
})
export class PublicLayoutComponent {

}