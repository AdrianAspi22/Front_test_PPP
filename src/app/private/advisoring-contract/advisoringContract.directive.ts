import {AdvisoringContractModel} from './models/advisoringContract.model';
import {Directive, EventEmitter, Input, Output} from '@angular/core';

export type SortColumnGroup = keyof AdvisoringContractModel | '';
export type SortDirectionGroup = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirectionGroup } = {'asc': 'desc', 'desc': '', '': 'asc'};

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
    },
    standalone: true,
})
export class NgbdListSortableHeaderGrupo {

    @Input() listsortablegroup: SortColumnGroup = '';
    @Input() directiongroup: SortDirectionGroup = '';
    @Output() listsortgroup = new EventEmitter<listSortEventGroup>();
    direction: string;

    rotate() {
        this.directiongroup = rotate[this.directiongroup];
        this.listsortgroup.emit({column: this.listsortablegroup, direction: this.directiongroup});
    }
}
