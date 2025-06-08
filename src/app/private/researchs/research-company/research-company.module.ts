import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResearchCompanyRouting } from './research-company-routing.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(ResearchCompanyRouting),
    ]
})
export class ResearchCompanyModule { }
