import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { ResearchCompanyModel } from './models/researchCompany.model';

export type SortColumnCompany = keyof ResearchCompanyModel | '';
export type SortDirectionCompany = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirectionCompany} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface listSortEventCompany {
    column: SortColumnCompany;
    direction: SortDirectionCompany;
}

@Directive({
    selector: 'th[listsortablecompany]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class NgbdListSortableHeaderCompany {

    @Input() listsortablecompany: SortColumnCompany = '';
    @Input() directioncompany: SortDirectionCompany = '';
    @Output() listsortcompany = new EventEmitter<listSortEventCompany>();

    rotate() {
        this.directioncompany = rotate[this.directioncompany];
        this.listsortcompany.emit({column: this.listsortablecompany, direction: this.directioncompany});
    }
}
