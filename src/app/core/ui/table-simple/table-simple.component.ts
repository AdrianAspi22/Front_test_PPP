import {
    Component,
    Input,
    OnInit,
    ContentChild,
    TemplateRef,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@shared/import-modules/layout.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-table-simple',
    standalone: true,
    templateUrl: './table-simple.component.html',
    styleUrls: ['./table-simple.component.scss'],
    imports: [MatInputModule, MatTableModule, CommonModule, LayoutModule, MatButtonModule, MatIconModule]
})
export class TableSimpleComponent<T> implements OnInit, OnChanges {

    @Input() data: Array<T>;
    @Input() columnsItem: Array<any>;

    @Input() actions: number[] = [];
    showActions: boolean = false;

    @Output() editEvent = new EventEmitter<number>();
    @Output() deleteEvent = new EventEmitter<number>();
    @Output() showEvent = new EventEmitter<number>();
    @Output() activeEvent = new EventEmitter<number>();

    @ContentChild(TemplateRef) actionTemplate: TemplateRef<any>;

    public dataSource: MatTableDataSource<T>;
    public displayedColumns: string[];


    constructor() {
        this.dataSource = new MatTableDataSource<T>([]);
        this.actions = [];
    }

    ngOnInit() {

        this.displayedColumns = this.columnsItem.map(column => column.key);

        this.dataSource = new MatTableDataSource<T>(this.data);

        this.validateActionButtons();

    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['data'] && changes['data'].currentValue !== changes['data'].previousValue) {
            if (this.dataSource) {
                this.dataSource.data = this.data;
            }
        }

    }


    editAction(id: number) {
        this.editEvent.emit(id);
    }

    deleteAction(id: number) {
        this.deleteEvent.emit(id);
    }

    showAction(id: number) {
        this.showEvent.emit(id);
    }

    activeAction(id: number) {
        this.activeEvent.emit(id);
    }


    validateActionButtons() {
        if (this.actions[0] == 0 && this.actions[1] == 0 && this.actions[2] == 0 && this.actions[3] == 0) {
            this.showActions = false;
        } else {
            //this.showActions = true;
            this.displayedColumns.push('actions');

        }
    }


}
