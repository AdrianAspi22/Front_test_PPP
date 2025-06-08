import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe, NgFor, NgForOf} from '@angular/common';

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
import {ResearchLineService} from '../../services/researchLine.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ResearchLineRegisterComponent} from '../research-line-register/research-line-register.component';
import {BreadcrumbsComponent} from "../../../../../core/ui/breadcrumbs/breadcrumbs.component";

@Component({
    selector: 'app-researchLine',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        MatPaginatorModule, NgbDropdownModule, NgbPaginationModule,
        NgbTypeaheadModule, FlatpickrModule, SimplebarAngularModule,
        NgPipesModule, NgbModalModule, BreadcrumbsComponent,
        NgForOf,
        NgFor
    ],
    templateUrl: './researchLine.component.html',
    styleUrls: ['./researchLine.component.scss'],
})


export class ResearchLineComponent {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
    public PAGE_SIZE: number = 10;
    public PAGE_NUMBER: number = 1;
    public totalRecords: number = 0;
    pageItemsStartsAt: number;
    pageItemsEndsAt: number;

    columns: any[] = [];
    columnCount: number = 0;
    researchLineIds: number[] = [];

    data: any[] = [];

    submitted = false;

    disableRegisterButton: boolean = false;

    constructor(
        private modalService: NgbModal,
        private researchLineService: ResearchLineService,
        private datePipe: DatePipe,
    ) {
    }

    ngOnInit(): void {

        this.breadCrumbItems = [
            {label: 'Research'},
            {label: 'Línea de Investigación', active: true}
        ];

        this.labelTable();
        this.getAllResearchLine();
    }


    labelTable() {
        this.columns = [
            {field: 'name', header: 'NOMBRE'},
            {field: 'researchAreaName', header: 'AREA DE INVESTIGACIÓN'},
            {field: 'researchGroupAcronym', header: 'GRUPO DE INVESTIGACIÓN'}

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


    getAllResearchLine() {
        let searchData;

        searchData = {
            pageSize: this.PAGE_SIZE,
            pageNumber: this.PAGE_NUMBER,
            researchLineIds: this.researchLineIds
        };

        this.researchLineService.getAllResearchLine(searchData).subscribe(
            (resp) => {
                if (resp.succeeded) {
                    this.data = resp.items;
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
        this.getAllResearchLine();
    }


    openModalRegister() {
        const modalRef = this.modalService.open(ResearchLineRegisterComponent, {
            backdrop: 'static',
            keyboard: false,
            centered: true,

        });
        modalRef.componentInstance.formName = 'AGREGAR NUEVO';
        modalRef.result.then(
            (result) => {
                this.getAllResearchLine();
            }
        );
    }

    openModalUpdate($event: any) {
        const modalRef = this.modalService.open(ResearchLineRegisterComponent, {
            backdrop: 'static',
            keyboard: false,
            centered: true,

        });
        modalRef.componentInstance.formName = 'ACTUALIZAR';
        modalRef.componentInstance.registerId = $event.id;
        modalRef.result.then(
            (result) => {
                this.getAllResearchLine();
            }
        );
    }


    deleteId: number;

    confirm(content: any, id: any) {
        this.deleteId = id;
        this.modalService.open(content, {centered: true});
    }


    deleteData(id: any) {
        this.researchLineService.researchLineDelete(id).subscribe((resp) => {
            if (resp.succeeded) {
                this.getAllResearchLine();
            }
        });
    }


}
