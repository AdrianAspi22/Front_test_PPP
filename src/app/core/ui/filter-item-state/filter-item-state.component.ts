import { MatRippleModule } from "@angular/material/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
//import { IconModule } from "@visurel/iconify-angular";
import { MenuStateItems } from "../../models/menu-state-items.interface";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import {  MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-filter-item-state',
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
  templateUrl: './filter-item-state.component.html',
  styleUrl: './filter-item-state.component.scss',
})
export class FilterItemStateComponent implements OnInit {
  @Input() currentMenu: number;
  @Input() items: MenuStateItems[];

  @Output() filterChange = new EventEmitter<any>();

 

  activeItem: MenuStateItems["id"] = "all";

  ngOnInit(): void {
    this.setCurrentFilter(this.currentMenu);
  }

  

  setCurrentFilter(itemNumber: number) {
    let currentItem = this.items.find((item) => item.value == itemNumber);
    this.activeItem = currentItem.id;
  }


  setFilter(selectedItemId: any, items: MenuStateItems[]) {
    const selectedItem = items.find(item => item.id === selectedItemId);
    this.activeItem = selectedItem.id;
    this.filterChange.emit(selectedItem.value);
  }

  
  

  optionClick(selectedItem: MenuStateItems) {
    this.setFilter(selectedItem.id, this.items);
  }

  isActive(item: MenuStateItems["id"]) {
    return this.activeItem === item;
  }

}
