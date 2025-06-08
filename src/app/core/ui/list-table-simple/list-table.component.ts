import {CommonModule} from "@angular/common";
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TableColumns, TableFooter} from "../../models/list-table.interface";
import {getEsPaginatorIntl} from "../../utils/paginator-intl/es-paginator-intl";
import {AlertService} from "../../services/alert.service";
import {DefaultService} from "../../services/default.service";
import {scaleFadeIn400ms} from "../../animations/scale-fade-in.animation";
import {fadeInUp400ms} from "../../animations/fade-in-up.animation";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {MatSort} from "@angular/material/sort";


@Component({
    selector: "app-list-table-simple",
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        FormsModule,
        MatMenu,
        MatIconButton,
        MatMenuTrigger,
        MatMenuItem,
        MatSort,

    ],
    templateUrl: "./list-table.component.html",
    styleUrls: ["./list-table.component.scss"],
    animations: [scaleFadeIn400ms, fadeInUp400ms],
    providers: [
        {
            provide: MatPaginatorIntl,
            useValue: getEsPaginatorIntl(),
        },

    ],
})
export class ListTableSimpleComponent<T> implements OnInit, AfterViewInit, OnChanges {
    @Input() service?: any;
    @Input() columns?: TableColumns<T>[];
    @Input() footer: TableFooter<T>[] = [];


    @Output() editEvent = new EventEmitter<T>();
    @Output() deleteEvent = new EventEmitter<T>();
    @Output() showEvent = new EventEmitter<T>();
    @Output() activeEvent = new EventEmitter<T>();

    @Output() manageRoleEvent = new EventEmitter<T>();
    @Output() managePermissionEvent = new EventEmitter<T>();
    @Output() changePasswordEvent = new EventEmitter<T>();

    @Input() stateChange?: EventEmitter<void>;
    @Input() registerSuccess?: EventEmitter<void>;
    @Input() updateSuccess?: EventEmitter<void>;
    @Input() deleteSuccess?: EventEmitter<void>;

    @Input() actions: number[] = [];


    dataSource = new MatTableDataSource<T>();

    visibleColumns?: Array<keyof T | string>;
    visibleFooter?: Array<keyof T | string | object>;


    constructor(
        private _alert: AlertService
    ) {
    }

    ngOnInit(): void {
        this.validateActionButtons();
        if (this.stateChange) {
            this.stateChange.subscribe(() => this.getDataByService());
        }

        if (this.registerSuccess) {
            this.registerSuccess.subscribe(() => this.getDataByService());
        }

        if (this.updateSuccess) {
            this.updateSuccess.subscribe(() => this.getDataByService());
        }

        if (this.deleteSuccess) {
            this.deleteSuccess.subscribe(() => this.getDataByService());
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['columns']) {
            this.setVisibleColumns();
        }

    }

    setVisibleColumns() {
        this.visibleColumns = this.columns
            .filter((columns: any) => columns.visible)
            .map((columns: any) => columns.property);
    }

    ngAfterViewInit(): void {
        if (this.service && this.isDefaultService(this.service)) {

            this.getDataByService();
        } else {
            console.log('El servicio proporcionado no implementa DefaultService.');
        }

    }


    async getDataByService() {
        //this._spinner.show("show-table");
        try {
            const data = await this.service.GetAllList().toPromise();
            this.setData(data);
        } catch (error) {
            this._alert.warn("Atención", "Ha ocurrido un error al cargar los datos");
        } finally {
            //this._spinner.hide("show-table");
        }
    }


    setData(data: any) {
        if (data.succeeded) {
            this.setVisibleColumns();
            this.dataSource.data = data.data;
            if (data.footer) this.setFooter(data.footer);

            this.dataSource._updateChangeSubscription();
        } else {
            this._alert.warn("Atención", "Ha ocurrido un error al cargar los datos")
        }
    }


    setFooter(data: any) {
        this.visibleFooter = [];
        if (this.footer.length && data) {
            this.footer.forEach((e) => {
                this.visibleFooter.push({
                    label: e.label,
                    value: data[e.property],
                    tooltip: e.tooltip,
                });
            });
        }
    }


    private isDefaultService(obj: any): obj is DefaultService {
        return 'GetAllList' in obj;
    }


    editAction(row: any) {
        this.editEvent.emit(row);
    }

    deleteAction(row: any) {
        this.deleteEvent.emit(row);
    }

    showAction(row: any) {
        this.showEvent.emit(row);
    }

    activeAction(row: any) {
        this.activeEvent.emit(row);
    }

    roleAction(row: any) {
        this.manageRoleEvent.emit(row);
    }

    permissionAction(row: any) {
        this.managePermissionEvent.emit(row);
    }

    changePasswordAction(row: any) {
        this.changePasswordEvent.emit(row);
    }

    validateActionButtons() {
        if (this.actions[0] != 0 && this.actions[1] != 0 && this.actions[2] != 0 && this.actions[3] != 0 && this.actions[4] != 0 && this.actions[5] != 0 && this.actions[6] != 0) {
            this.visibleColumns.push('actions');
        }
    }

    formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }


}
