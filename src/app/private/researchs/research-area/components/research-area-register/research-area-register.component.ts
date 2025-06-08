import { ResearchGroupAcronymModel } from '../../models/researchGroupAcronym.interface';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ResearchAreaService } from '../../services/researchArea.service';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-research-area-register',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgbModalModule, NgClass, ReactiveFormsModule],
  templateUrl: './research-area-register.component.html',
  styleUrl: './research-area-register.component.scss'
})
export class ResearchAreaRegisterComponent {
  form: FormGroup;
  @Input() formName: string;
  @Input() registerId: number;

  disableRegisterButton: boolean = false;
  submitted = false;
  GroupAcronym: ResearchGroupAcronymModel[] = [];

  constructor(
    private _fb: FormBuilder,
    private researchAreaService: ResearchAreaService,

    public activeModal: NgbActiveModal
  ) {
    this.inputDate();
  }

  ngOnInit(): void {
    if (this.registerId) {
      this.researchAreaById(this.registerId);
    }
    this.loadAcronyms();
  }

  inputDate() {
    this.form = this._fb.group({
      researchAreaId: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      researchGroupId: [0, [Validators.required]]
    });
  }

  loadAcronyms() {
    this.researchAreaService.getAcronyms().subscribe((acronyms: ResearchGroupAcronymModel[]) => {
      this.GroupAcronym = acronyms;
    });
  }

  researchAreaSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }

    const researchAreaId = this.form.get('researchAreaId').value

    if (researchAreaId > 0) {
      this.researchAreaUpdate()
    } else {
      this.researchAreaRegister()
    }
  }

  researchAreaRegister() {
    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchAreaService.researchAreaRegister(formValue).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchAreaUpdate() {
    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchAreaService.researchAreaUpdate(formValue).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchAreaById(id: number): void {
    this.researchAreaService.researchAreaById(id).subscribe(
      (resp) => {
        this.form.reset({
          researchAreaId: resp.data.researchAreaId,
          name: resp.data.name,
          researchGroupId: resp.data.researchGroupId,
        })
      }
    )
  }


  getErrorMessage(field: string): string {
    if (this.form.get(field)?.hasError('minlength')) {
      return `Debe tener al menos ${this.form.get(field)?.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (this.form.get(field)?.hasError('maxlength')) {
      return `No puede exceder los ${this.form.get(field)?.errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
