import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchGroupRouting } from './research-group-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ResearchGroupRouting)
  ]
})
export class ResearchGroupModule { }
