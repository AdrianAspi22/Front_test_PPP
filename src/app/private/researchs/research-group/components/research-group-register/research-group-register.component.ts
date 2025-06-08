import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ResearchGroupService } from '../../services/researchGroup.service';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgClass} from "@angular/common";


@Component({
  selector: 'app-research-group-register',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgbModalModule, NgClass, ReactiveFormsModule],
  templateUrl: './research-group-register.component.html',
  styleUrl: './research-group-register.component.scss'
})
export class ResearchGroupRegisterComponent implements OnInit {

  form: FormGroup;
  @Input() formName: string;
  @Input() registerId: number;
  
  disableRegisterButton: boolean = false;
  
  submitted = false;

  constructor(
    private _fb: FormBuilder,
    private researchGroupService:ResearchGroupService,
  
    public activeModal: NgbActiveModal
  ){
this.inputDate();
  }

  ngOnInit(): void {
    if(this.registerId){
      this.researchGroupById(this.registerId);
    }
  }


  inputDate() {
    this.form = this._fb.group({
      researchGroupId:[0,[Validators.required]],
      name: ['', [Validators.required]],
      acronym: ['', [Validators.required]],
      objective: ['', [Validators.required]],
    });
  }

  researchGroupSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }

    const researchGroupId = this.form.get('researchGroupId').value

    if (researchGroupId > 0) {
      this.researchGroupUpdate()
    } else {
      this.researchGroupRegister()
    }
  }

  researchGroupRegister(){

    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchGroupService.researchGroupRegister(formValue).subscribe((resp)=>{
      this.disableRegisterButton = false;
      if(resp.succeeded){
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchGroupUpdate(){

    this.disableRegisterButton = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      })
    }
    const formValue = this.form.getRawValue();
    this.researchGroupService.researchGroupUpdate(formValue).subscribe((resp)=>{
      this.disableRegisterButton = false;
      if(resp.succeeded){
        this.activeModal.close();
        this.submitted = true
      }
    })
  }


  researchGroupById(id:number):void{
    this.researchGroupService.researchGroupById(id).subscribe(
      (resp) => {
        this.form.reset({
          researchGroupId: resp.data.researchGroupId,
          name: resp.data.name,
          acronym: resp.data.acronym,
          objective: resp.data.objective,
        })
      }
    )
  }
}
