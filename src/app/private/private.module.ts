import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCollapseModule, NgbDropdownModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {SimplebarAngularModule} from 'simplebar-angular';

// Pages Routing
import {TopbarComponent} from './layout/topbar/topbar.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {TranslateModule} from '@ngx-translate/core';
import {RightsidebarComponent} from './layout/rightsidebar/rightsidebar.component';
import {LanguageService} from '../core/services/language.service';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {VerticalComponent} from "./layout/vertical/vertical.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
    declarations: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        RightsidebarComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgbCollapseModule,
        NgbDropdownModule,
        NgbNavModule,
        SimplebarAngularModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        RouterLink,
        RouterLinkActive
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        RightsidebarComponent
    ],
    providers: [LanguageService]
})
export class PrivateModule {
}
