import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResearchLineRouting } from './research-line-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ResearchLineRouting),
  ]
})
export class ResearchLineModule { }
