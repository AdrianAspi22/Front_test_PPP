import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

import {
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FlatpickrModule} from 'angularx-flatpickr';

import {SimplebarAngularModule} from 'simplebar-angular';
import {NgPipesModule} from 'ngx-pipes';
import {ResearchCompanyService} from '../../services/researchCompany.service';
import {MatPaginatorModule} from '@angular/material/paginator';

//import {ResearchAreaRegisterComponent} from '../research-area-register/research-area-register.component';

import {BreadcrumbsComponent} from "../../../../../core/ui/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-researchCompany',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatPaginatorModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, FlatpickrModule, SimplebarAngularModule, NgPipesModule, NgbModalModule, BreadcrumbsComponent, NgForOf],
  templateUrl: './researchCompany.component.html',
  styleUrls: ['./researchCompany.component.scss'],


})

export class ResearchCompanyComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public PAGE_SIZE: number = 10;
  public PAGE_NUMBER: number = 1;
  public totalRecords: number = 0;
  pageItemsStartsAt: number;
  pageItemsEndsAt: number;

  columns: any[] = [];
  columnCount: number = 0;
  researchCompanysIds: number[] = [];

  data: any[] = [];


  submitted = false;

  disableRegisterButton: boolean = false;


  constructor(
      private modalService: NgbModal,
      private researchCompanyService: ResearchCompanyService,
      private datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label: 'Research'},
      {label: 'Área de Investigación', active: true}
    ];
    this.labelTable();
    this.getAllResearchCompany();
  }


  labelTable() {
    this.columns = [
      { field: 'companyName', header: 'RAZÓN SOCIAL' },
      { field: 'identificationNumber', header: 'RUC' },
      { field: 'email', header: 'EMAIL' },
      { field: 'phoneNumber', header: 'TELÉFONO' },
      { field: 'practiceCount', header: 'CANTIDAD DE PRÁCTICAS' },
      { field: 'startDate', header: 'FECHA INICIO' },
      { field: 'endDate', header: 'FECHA FIN' }
    ];
    this.columnCount = this.columns.length + 1;
  }



  validaDate(value): Date {
    var responseDate;
    if (value != null) {
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd hh:mm:ss');
    }
    return responseDate;
  }


  getAllResearchCompany() {
    let searchData;

    searchData = {
      pageSize: this.PAGE_SIZE,
      pageNumber: this.PAGE_NUMBER,
      researchCompanysIds: this.researchCompanysIds
    };

    this.researchCompanyService.getAllResearchCompany(searchData).subscribe(
        (resp) => {
          console.log('Respuesta API:', resp);
          if (resp && Array.isArray(resp)) {
            this.data = resp;
            this.totalRecords = resp.length;
            this.pageItemsStartsAt = this.PAGE_SIZE * (this.PAGE_NUMBER - 1) + 1;
            this.pageItemsEndsAt = this.pageItemsStartsAt + resp.length - 1;
          } else {
            this.data = [];
            this.totalRecords = 0;
          }

        });
  }

  onPageChanged(event) {
    this.PAGE_NUMBER = event.pageIndex + 1;
    this.PAGE_SIZE = event.pageSize;
    this.getAllResearchCompany();
  }
  openModalRegister() {
    // no hace nada
  }

  openModalUpdate(row: any) {
    // no hace nada
  }


  deleteData(id: any) {
    // no hace nada
  }










  deleteId: number;

  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, {centered: true});
  }




}