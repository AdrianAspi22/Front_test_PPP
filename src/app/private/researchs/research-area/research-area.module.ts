import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResearchAreaRouting } from './research-area-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ResearchAreaRouting),
  ]
})
export class ResearchAreaModule { }
