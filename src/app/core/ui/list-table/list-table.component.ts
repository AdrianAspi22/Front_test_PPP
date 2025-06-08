import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TableColumns, TableFooter } from "../../models/list-table.interface";
import { getEsPaginatorIntl } from "../../utils/paginator-intl/es-paginator-intl";
import { AlertService } from "../../services/alert.service";
import { DefaultService } from "../../services/default.service";
import { startWith, switchMap } from "rxjs/operators";
import { fadeInUp400ms } from "../../animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "../../animations/scale-fade-in.animation";
//import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-list-table",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
,
   // NgxSpinnerModule
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
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @Input() service?: any;
  @Input() columns?: TableColumns<T>[];
  @Input() getInputs: any;
  @Input() numRecords?: number = 10;
  @Input() sortBy?: string;
  @Input() sortDir: any = "asc";
  @Input() footer: TableFooter<T>[] = [];


  

  @Output() editEvent = new EventEmitter<T>();
  @Output() deleteEvent = new EventEmitter<T>();
  @Output() showEvent = new EventEmitter<T>();
  @Output() registerEvent = new EventEmitter<T>();
  @Output() activeEvent = new EventEmitter<T>();
  @Output() changeStateEvent = new EventEmitter<T>();
  @Output() downloadEvent = new EventEmitter<T>();

  @Output() followingEvent = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @Input() actions?: number[]=[];

  changesGetInputs = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  visibleColumns?: Array<keyof T | string>;
  visibleFooter?: Array<keyof T | string | object>;

  paginatorOptions = {
    pageSizeOptions: [10, 20, 50, 100],
    pageSize: 10,
    pageLength: 0,
  };

  constructor(
    //private _spinner: NgxSpinnerService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.validateActionButtons();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.setVisibleColumns();
    }
    if (changes['getInputs'] && this.paginator) {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
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
      this.sortChanges();
      this.paginatorChanges();
    } 

  }




  async getDataByService() {
    this.changesGetInputs
      .pipe(
        startWith(""),
        switchMap(() => {
          //this._spinner.show();
          return this.service.GetAll(
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.getInputs
          );
        })
      )
      .subscribe((data: any) => {
        this.setData(data);
       // this._spinner.hide();
      });
  }


  setData(data: any) {
    if (data.succeeded) {
      this.setVisibleColumns();
      this.paginatorOptions.pageLength = data.totalRecords;
      this.dataSource.data = data.data;
      if (data.footer) this.setFooter(data.footer);
      
      this.dataSource._updateChangeSubscription();
    } 
    else{
      this._alert.warn("Atención",data.messages);
      this.dataSource.data=[];
      this.paginatorOptions.pageLength=0;
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

  sortChanges() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.changesGetInputs.emit();
    });
  }

  paginatorChanges() {
    this.paginator.page.subscribe(() => {
      this.changesGetInputs.emit();
    });
  }


 
  private isDefaultService(obj: any): obj is DefaultService {
    return 'GetAll' in obj ;
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

  registerAction(row: any) {
    this.registerEvent.emit(row);
  }

  activeAction(row: any) {
    this.activeEvent.emit(row);
  }

  changeStateAction(row: any) {
    this.changeStateEvent.emit(row);
  }

  downaloasAction(row: any) {
    const url = row['url']; 
    this.downloadFile(url);
    this.downloadEvent.emit(row);
  }

  followingEventAction(row:any){
    this.followingEvent.emit(row);
  }


  downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    const filename = url.substring(url.lastIndexOf('/') + 1);
    link.download = filename; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

 

  getData() {
    return this.dataSource.data;

  }

  validateActionButtons() {
    if(this.actions.length > 0){
      if (this.actions[0] != 0 && this.actions[1] != 0 && this.actions[2] != 0 && this.actions[3] != 0 && this.actions[4] != 0  && this.actions[5] != 0 && this.actions[6] !=0  && this.actions[7] !=0) {
        this.visibleColumns.push('actions');
      } 
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
