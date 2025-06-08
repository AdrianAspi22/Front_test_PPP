import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

import { NgbDropdownModule, NgbModal, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AdvisoringRequestService } from '../../services/advisoringRequest.service';
import {BreadcrumbsComponent} from "../../../../core/ui/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-advisoring-request-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BreadcrumbsComponent,
    NgForOf
  ],
  templateUrl: './advisoring-request-list.component.html',
  styleUrl: './advisoring-request-list.component.scss'
})
export class AdvisoringRequestListComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public PAGE_SIZE: number = 10;
  public PAGE_NUMBER: number = 1;
  public totalRecords: number = 0;
  pageItemsStartsAt: number;
  pageItemsEndsAt: number;

  columns: any[] = [];
  columnCount: number = 0;
  advisoringRequestIds: number[] = [];

  data: any[] = [];
  submitted = false;
  disableRegisterButton: boolean = false;

  constructor(
    private modalService: NgbModal,
    private advisoringRequestService: AdvisoringRequestService,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Advisoring Request' },
      { label: 'Lista de Solicitudes de Asesorías', active: true }
    ];

    this.labelTable();
    this.getAllAdvisoringRequest();
  }

  labelTable(){
    this.columns = [
      { field: 'requesterActorId', header: 'SOLICITANTE'},
      { field: 'userMessage', header: 'MENSAJE DEL SOLICITANTE'},
      { field: 'dateRequest', header: 'FECHA DE SOLICITUD'},
      { field: 'responseAdvisor', header: 'MENSAJE DE RESPUESTA'},
      { field: 'dateResponseAdvisor', header: 'FECHA DE RESPUESTA'}
      //{ field: 'advisorActorId', header: ''}, //esto es para Coordinador
    ];
    this.columnCount = this.columns.length + 1;
  }

  validaDate(value): Date {
    var responseDate;
    if(value != null){
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
    return responseDate;
  }

  getAllAdvisoringRequest(){
    let searchData;

    searchData = {
      pageSize: this.PAGE_SIZE,
      pageNumber: this.PAGE_NUMBER,
      advisoringRequestIds: this.advisoringRequestIds
    };

    this.advisoringRequestService.getAllAdvisoringRequest(searchData).subscribe(
      (resp) =>{
        if(resp.succeeded){
          this.data = resp.items.map(item => ({
            ...item,
            dateRequest: this.datePipe.transform(item.dateRequest, 'dd-MM-yyyy'),
            dateResponseAdvisor: this.datePipe.transform(item.dateResponseAdvisor, 'dd-MM-yyyy')
          }));
          this.pageItemsStartsAt = resp.pageItemsStartsAt;
          this.pageItemsEndsAt = resp.pageItemsEndsAt;
          this.totalRecords = resp.totalItems;
        } else {
          this.data = [];
        }
      });
  }
  onPageChanged(event) {
    this.PAGE_NUMBER = event.pageIndex + 1;
    this.PAGE_SIZE = event.pageSize;
    this.getAllAdvisoringRequest();
  }

  deleteId:number;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }



  deleteData(id: any) {
    this.advisoringRequestService.AdvisoringRequestDelete(id).subscribe((resp) => {
      if (resp.succeeded) {
        this.getAllAdvisoringRequest();
      }
    });
  }
}