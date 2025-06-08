import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-spinner.component.html',
  styleUrls: ['./display-spinner.component.scss']
})
export class DisplaySpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
