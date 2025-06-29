import { Component, OnInit, Input } from '@angular/core';
import {FeatherModule} from "angular-feather";
import {NgClass} from "@angular/common";
import {CountUpModule} from "ngx-countup";

@Component({
  selector: 'app-projects-stat',
  templateUrl: './projects-stat.component.html',
  styleUrls: ['./projects-stat.component.scss'],
  imports: [
    FeatherModule,
    NgClass,
    CountUpModule
  ],
  standalone: true
})

/**
 * Projects Stat Component
 */
export class ProjectsStatComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() value: any | undefined;
  @Input() icon: string | undefined;
  @Input() persantage: string | undefined;
  @Input() profit: string | undefined;
  @Input() month: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

}
