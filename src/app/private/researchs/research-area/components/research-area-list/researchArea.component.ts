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
import {ResearchAreaService} from '../../services/researchArea.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ResearchAreaRegisterComponent} from '../research-area-register/research-area-register.component';
import {BreadcrumbsComponent} from "../../../../../core/ui/breadcrumbs/breadcrumbs.component";

@Component({
    selector: 'app-researchArea',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MatPaginatorModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, FlatpickrModule, SimplebarAngularModule, NgPipesModule, NgbModalModule, BreadcrumbsComponent, NgForOf],
    templateUrl: './researchArea.component.html',
    styleUrls: ['./researchArea.component.scss'],


})

export class ResearchAreaComponent {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
    public PAGE_SIZE: number = 10;
    public PAGE_NUMBER: number = 1;
    public totalRecords: number = 0;
    pageItemsStartsAt: number;
    pageItemsEndsAt: number;

    columns: any[] = [];
    columnCount: number = 0;
    researchAreasIds: number[] = [];

    data: any[] = [];


    submitted = false;

    disableRegisterButton: boolean = false;


    constructor(
        private modalService: NgbModal,
        private researchAreaService: ResearchAreaService,
        private datePipe: DatePipe,
    ) {

    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Research'},
            {label: 'Área de Investigación', active: true}
        ];
        this.labelTable();
        this.getAllResearchArea();
    }


    labelTable() {
        this.columns = [
            {field: 'name', header: 'NOMBRE'},
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


    getAllResearchArea() {
        let searchData;

        searchData = {
            pageSize: this.PAGE_SIZE,
            pageNumber: this.PAGE_NUMBER,
            researchAreasIds: this.researchAreasIds
        };

        this.researchAreaService.getAllResearchArea(searchData).subscribe(
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
        this.getAllResearchArea();
    }


    openModalRegister() {
        const modalRef = this.modalService.open(ResearchAreaRegisterComponent, {
            backdrop: 'static',
            keyboard: false,
            centered: true,

        });
        modalRef.componentInstance.formName = 'AGREGAR NUEVO';
        modalRef.result.then(
            (result) => {
                this.getAllResearchArea();
            }
        );
    }

    openModalUpdate($event: any) {
        const modalRef = this.modalService.open(ResearchAreaRegisterComponent, {
            backdrop: 'static',
            keyboard: false,
            centered: true,

        });
        modalRef.componentInstance.formName = 'ACTUALIZAR';
        modalRef.componentInstance.registerId = $event.id;
        modalRef.result.then(
            (result) => {
                this.getAllResearchArea();
            }
        );
    }


    deleteId: number;

    confirm(content: any, id: any) {
        this.deleteId = id;
        this.modalService.open(content, {centered: true});
    }


    deleteData(id: any) {
        this.researchAreaService.researchAreaDelete(id).subscribe((resp) => {
            if (resp.succeeded) {
                this.getAllResearchArea();
            }
        });
    }


}