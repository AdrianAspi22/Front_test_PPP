import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { ResearchGroupModel } from './models/researchGroup.model';

export type SortColumnGroup = keyof ResearchGroupModel | '';
export type SortDirectionGroup = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirectionGroup} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface listSortEventGroup {
  column: SortColumnGroup;
  direction: SortDirectionGroup;
}

@Directive({
  selector: 'th[listsortablegroup]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdListSortableHeaderGrupo {

  @Input() listsortablegroup: SortColumnGroup = '';
  @Input() directiongroup: SortDirectionGroup = '';
  @Output() listsortgroup = new EventEmitter<listSortEventGroup>();

  rotate() {
    this.directiongroup = rotate[this.directiongroup];
    this.listsortgroup.emit({column: this.listsortablegroup, direction: this.directiongroup});
  }
}
