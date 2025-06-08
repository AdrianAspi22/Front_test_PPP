import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { AlertService } from '../../../../core/services/alert.service';
import { UserService } from '../../../../core/services/user/user.service';
import { GenericValidators } from '../../../../core/utils/validators/generic-validators';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatDialogActions,
    MatError,
    MatButton,
    MatDialogClose,
    MatOption,
    MatLabel,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    NgForOf,
    MatDivider,
    MatIcon,
    MatDialogContent,
    NgIf,
    MatInput,
    MatIconButton,
    MatDialogTitle
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  disableRegisterButton: boolean;
  form: FormGroup;
  profileId:string;

  BranchOfficeData:any[]=[];
  ChargeData:any[]=[];
  UserData:any[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UpdateProfileComponent>
  ){
    this.initForm();
  }

  ngOnInit(): void {
    if(this.data != null){
      this.getUserById(this.data.profileId);
    }
   // this.chargeSelect();
    this.userSelect();
  }


  initForm(): void {

    this.form = this._fb.group({
      profileId: ['', [Validators.required]],
      firstName: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      lastName: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(100)]],
     // phoneNumber: ['', [Validators.required,Validators.minLength(9), Validators.maxLength(12)]],
      email: [ '', [Validators.required, GenericValidators.emailValidation]],
      userLogin: ['', [Validators.required]],
      //branchOfficeId: ['', [Validators.required]],
      chargeId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
  
  } 

  
getErrorMessage(controlName: string): string {
  const control = this.form.get(controlName);
  if (control.hasError('required')) {
    return 'Este campo es requerido';
  }

  if (control.hasError('minlength')) {
    return `Debe tener al menos ${control.getError('minlength').requiredLength} caracteres`;
  }

  if (control.hasError('maxlength')) {
    return `No puede tener más de ${control.getError('maxlength').requiredLength} caracteres`;
  }

  if (control.hasError('emailValidation')) {
    return 'El correo no es válido.';
  }

  if (control.hasError('IsNotNumberDecimal')) {
    return 'El Campo debe ser solo numeros.';
  }

  if (control.hasError('IsNotNumber')) {
    return 'El Campo debe ser solo numeros.';
  }

  return '';
}

updateProfile(): void {
  this.disableRegisterButton = true;

  if (this.form.invalid) {
    return Object.values(this.form.controls).forEach((controls) => {
      controls.markAllAsTouched();
    });
  }


  const formValue = this.form.getRawValue();


  this._userService.updateProfile(formValue).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this._alert.success('Excelente', resp.messages);
        this._dialogRef.close(true);
      } else {
        this._alert.warn('Atención', resp.messages);
      }
    });
}


  getUserById(id:string):void{
    this._userService.UserById(id).subscribe((resp)=>{
      if(resp.succeeded){
        this.form.reset({
          profileId:resp.data.id,
          firstName:resp.data.firstName,
          lastName:resp.data.lastName,
          //phoneNumber:resp.data.phoneNumber,
          email:resp.data.email,
          userLogin:resp.data.userName,
          branchOfficeId:resp.data.branchOfficeId,
          chargeId:resp.data.chargeId,
          userId:resp.data.userId
        });
      }
    })
  }

 
/* chargeSelect():void{
  this._chargeService.chargeSelect().subscribe((resp)=>{
    if(resp.succeeded){
      this.ChargeData=resp.data;
    }
  })
} */

userSelect():void{
  this._userService.userSelectList().subscribe((resp)=>{
    if(resp.succeeded){
      this.UserData=resp.data;
    }
  })
}
}
