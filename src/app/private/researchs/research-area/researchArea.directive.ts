import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { ResearchAreaModel } from '../research-line/models/researchArea.interface';

export type SortColumnArea = keyof ResearchAreaModel | '';
export type SortDirectionArea = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirectionArea} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface listSortEventArea {
  column: SortColumnArea;
  direction: SortDirectionArea;
}

@Directive({
  selector: 'th[listsortablearea]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdListSortableHeaderArea {

  @Input() listsortablearea: SortColumnArea = '';
  @Input() directionarea: SortDirectionArea = '';
  @Output() listsortarea = new EventEmitter<listSortEventArea>();

  rotate() {
    this.directionarea = rotate[this.directionarea];
    this.listsortarea.emit({column: this.listsortablearea, direction: this.directionarea});
  }
}
