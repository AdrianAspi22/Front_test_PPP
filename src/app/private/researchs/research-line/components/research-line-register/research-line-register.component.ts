import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ResearchLineService } from '../../services/researchLine.service';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ResearchAreaModel } from '../../models/researchArea.interface';
import { ResearchGroupAcronymRLineModel } from '../../models/researchGroupAcronym-RLine.interface';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-research-line-register',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgbModalModule, ReactiveFormsModule, NgClass, NgForOf],
  templateUrl: './research-line-register.component.html',
  styleUrl: './research-line-register.component.scss'
})
export class ResearchLineRegisterComponent {
  form: FormGroup;
  @Input() formName: string;
  @Input() registerId: number;

  disableRegisterButton: boolean = false;

  submitted = false;
  GroupAcronym: ResearchGroupAcronymRLineModel[] = [];
  AreaName: ResearchAreaModel[] = [];

  constructor(
    private _fb: FormBuilder,
    private researchLineService: ResearchLineService,
    public activeModal: NgbActiveModal
  ) {
    this.inputDate();
  }

  ngOnInit(): void {
    this.loadResearchGroups();
    if (this.registerId) {
      this.researchLineById(this.registerId);
    }
  }


  inputDate() {
    this.form = this._fb.group({
      researchLineId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      researchAreaId: [0, [Validators.required]],
      researchGroupId: [0, [Validators.required]]
    });
  }

  loadResearchGroups() {
    this.researchLineService.getAcronyms().subscribe((groups) => {
      this.GroupAcronym = groups;
    });
  }

  onGroupChange(event: any) {
    const groupId = event.target.value;
    this.loadResearchAreas(groupId);
  }

  loadResearchAreas(groupId: number) {
    this.researchLineService.researchAreaByGroup(groupId).subscribe((areas) => {
      this.AreaName = areas;
    });
  }

  researchLineSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }

    const researchLineId = this.form.get('researchLineId').value

    if (researchLineId > 0) {
      this.researchLineUpdate()
    } else {
      this.researchLineRegister()
    }
  }

  researchLineRegister() {

    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchLineService.researchLineRegister(formValue).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchLineUpdate() {

    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchLineService.researchLineUpdate(formValue).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchLineById(id: number): void {
    this.researchLineService.researchLineById(id).subscribe(
      (resp) => {
        this.form.reset({
          researchLineId: resp.data.researchLineId,
          name: resp.data.name,
          researchAreaId: resp.data.researchAreaId,
          researchGroupId: resp.data.researchGroupId
        })
      }
    )
  }
}
