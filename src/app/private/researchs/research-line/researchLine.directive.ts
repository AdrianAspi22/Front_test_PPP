import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {ResearchLineModel} from './models/researchLine.model';

export type SortColumnLine = keyof ResearchLineModel | '';
export type SortDirectionLine = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirectionLine} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface listSortEventLine {
  column: SortColumnLine;
  direction: SortDirectionLine;
}

@Directive({
  selector: 'th[listsortableline]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdListSortableHeaderLine {

  @Input() listsortableline: SortColumnLine = '';
  @Input() directionline: SortDirectionLine = '';
  @Output() listsortline = new EventEmitter<listSortEventLine>();

  rotate() {
    this.directionline = rotate[this.directionline];
    this.listsortline.emit({column: this.listsortableline, direction: this.directionline});
  }
}
