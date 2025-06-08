import { MatRippleModule } from "@angular/material/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
//import { IconModule } from "@visurel/iconify-angular";
import { MenuItems } from "../../models/menu-items.interface";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import {  MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-filter-by-state',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    //IconModule,
    MatRippleModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './filter-by-state.component.html',
  styleUrls: ['./filter-by-state.component.scss']
})
export class FilterByStateComponent implements OnInit {

  @Input() currentMenu: number;
  @Input() items: MenuItems[];

  @Output() filterChange = new EventEmitter<any>();

 

  activeItem: MenuItems["id"] = "all";

  ngOnInit(): void {
    this.setCurrentFilter(this.currentMenu);
  }

  

  setCurrentFilter(itemNumber: number) {
    let currentItem = this.items.find((item) => item.value == itemNumber);
    this.activeItem = currentItem.id;
  }


  setFilter(selectedItemId: any, items: MenuItems[]) {
    const selectedItem = items.find(item => item.id === selectedItemId);
    this.activeItem = selectedItem.id;
    this.filterChange.emit(selectedItem.value);
  }

  
  

  optionClick(selectedItem: MenuItems) {
    this.setFilter(selectedItem.id, this.items);
  }

  isActive(item: MenuItems["id"]) {
    return this.activeItem === item;
  }

 

}
