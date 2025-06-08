import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdvisoringContractService } from '../../services/advisoringContract.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-advisoring-contract-register',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './advisoring-contract-register.component.html',
  styleUrls: ['./advisoring-contract-register.component.scss']
})
export class AdvisoringContractRegisterComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  researchGroupId: number | null = null;
  researchLineId: number | null = null;
  researchAreaId: number | null = null;
  docenteId: number | null = null;

  groups: any[] = [];
  lines: any[] = [];
  areas: any[] = [];
  advisors: any[] = [];
  rawData: any[] = [];

  subject: string = '';
  description: string = '';

  showModal = false;

  constructor(private advisoringContractService: AdvisoringContractService) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Advisoring Contract' },
      { label: 'Crear Contrato de Asesoría', active: true }
    ];
    this.loadGroups();
  }

  loadGroups() {
    this.advisoringContractService.researchGroupFiltered().subscribe((response: any) => {
      console.log('Respuesta del backend:', response);
      this.rawData = response.data;
      this.groups = this.getUniqueGroups(response.data);
    });
  }

  getUniqueGroups(data: any[]): any[] {
    const uniqueGroups = new Map();
    
    data.forEach(item => {
      if (!uniqueGroups.has(item.researchGroupId)) {
        uniqueGroups.set(item.researchGroupId, {
          researchGroupId: item.researchGroupId,
          researchGroupName: item.researchGroupName,
          researchGroupAcronym: item.researchGroupAcronym
        });
      }
    });
    
    return Array.from(uniqueGroups.values());
  }

  getUniqueLines(data: any[]): any[] {
    const uniqueLines = new Map();
    
    data.forEach(item => {
      const key = `${item.researchLineId}`;
      if (!uniqueLines.has(key)) {
        uniqueLines.set(key, {
          researchLineId: item.researchLineId,
          researchLineName: item.researchLineName
        });
      }
    });
    
    return Array.from(uniqueLines.values());
  }

  getUniqueAreas(data: any[]): any[] {
    const uniqueAreas = new Map();
    
    data.forEach(item => {
      const key = `${item.researchAreaId}`;
      if (!uniqueAreas.has(key)) {
        uniqueAreas.set(key, {
          researchAreaId: item.researchAreaId,
          researchAreaName: item.researchAreaName
        });
      }
    });
    
    return Array.from(uniqueAreas.values());
  }

  getUniqueAdvisors(data: any[]): any[] {
    const uniqueAdvisors = new Map();
    
    data.forEach(item => {
      const key = `${item.actorId}`;
      if (!uniqueAdvisors.has(key)) {
        uniqueAdvisors.set(key, {
          actorId: item.actorId,
          actorFirstName: item.actorFirstName,
          actorLastName: item.actorLastName,
          actorType: item.actorType
        });
      }
    });
    
    return Array.from(uniqueAdvisors.values());
  }

  onGroupSelected(groupId: number): void {
    if (!groupId) return;
    
    this.researchGroupId = groupId;
    this.researchLineId = null;
    this.researchAreaId = null;
    this.docenteId = null;

    // Filtrar líneas por grupo
    const filteredData = this.rawData.filter(item => 
      item.researchGroupId === groupId
    );
    
    this.lines = this.getUniqueLines(filteredData);
    this.areas = [];
    this.advisors = this.getUniqueAdvisors(filteredData);
  }

  onLineSelected(lineId: number): void {
    if (!lineId) return;

    this.researchLineId = lineId;
    this.researchAreaId = null;

    // Filtrar áreas por grupo y línea
    const filteredData = this.rawData.filter(item => 
      item.researchGroupId === this.researchGroupId && 
      item.researchLineId === lineId
    );
    
    this.areas = this.getUniqueAreas(filteredData);
    this.advisors = this.getUniqueAdvisors(filteredData);
  }

  onAreaSelected(areaId: number): void {
    if (!areaId) return;

    this.researchAreaId = areaId;

    // Filtrar asesores por grupo, línea y área
    const filteredData = this.rawData.filter(item => 
      item.researchGroupId === this.researchGroupId && 
      item.researchLineId === this.researchLineId &&
      item.researchAreaId === areaId
    );
    
    this.advisors = this.getUniqueAdvisors(filteredData);
  }

  submitRequest() {
    if (!this.researchGroupId || !this.researchLineId || 
        !this.researchAreaId || !this.docenteId || 
        !this.subject || !this.description) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const estudianteId = Number(localStorage.getItem('actorId'));
  
    if (isNaN(estudianteId)) {
      alert("El estudiante ID no es válido o no se encontró en el almacenamiento local.");
      return;
    }
  
    const requestData = {
      researchGroupId: this.researchGroupId,
      researchLineId: this.researchLineId,
      researchAreaId: this.researchAreaId,
      docenteId: this.docenteId,
      subject: this.subject,
      description: this.description,
      estudianteId: estudianteId,
    };
  
    this.advisoringContractService.AdvisoringContractRegister(requestData).subscribe(
      (response) => {
        console.log('Respuesta del servicio:', response);
        this.showModal = true;
      },
      (error) => {
        console.error('Error al registrar el contrato:', error);
        // Manejar el error aquí
      }
    );
  }

  resetForm(): void {
    this.researchGroupId = null;
    this.researchLineId = null;
    this.researchAreaId = null;
    this.docenteId = null;
    this.subject = '';
    this.description = '';
    this.lines = [];
    this.areas = [];
    this.advisors = [];
  }

  closeModal(event?: MouseEvent): void {
    if (!event || (event.target as HTMLElement).className === 'modal-overlay') {
      this.showModal = false;
      this.resetForm();
    }
  }
}