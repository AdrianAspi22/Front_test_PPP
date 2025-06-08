import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from '../../../../core/services/alert.service';
import {UserService} from "../../../../core/services/user/user.service";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {UserDto} from '../../../../core/models/user/userDto.interface';
import {GenericValidators} from '../../../../core/utils/validators/generic-validators';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-user-manage',
    standalone: true,
    imports: [
        MatError,
        MatDialogActions,
        MatButton,
        MatOption,
        MatFormField,
        MatSelect,
        ReactiveFormsModule,
        MatDialogClose,
        MatDivider,
        MatDialogContent,
        MatIcon,
        MatIconButton,
        MatDialogTitle,
        MatInput,
        NgIf,
        MatSuffix,
        NgForOf,
        MatLabel
    ],
    templateUrl: './user-manage.component.html',
    styleUrl: './user-manage.component.scss'
})
export class UserManageComponent implements OnInit {

    ocultarPassword: boolean = true;
    ocultarPasswordConfirm: boolean = true;
    userRequestDto: UserDto;

    BranchOfficeData: any[] = [];
    ChargeData: any[] = [];
    UserData: any[] = [];


    disableRegisterButton: boolean = false;
    form: FormGroup;

    constructor(private _fb: FormBuilder,
                private _alert: AlertService,
                private _userService: UserService,
                public _dialogRef: MatDialogRef<UserManageComponent>,) {
        this.initForm();
    }

    ngOnInit(): void {
        // this.chargeSelect();
        this.userSelect();

    }

    initForm(): void {
        this.form = this._fb.group({
            firstName: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(100), GenericValidators.onlyTextAndSpaceValidator]],
            lastName: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(100), GenericValidators.onlyTextAndSpaceValidator]],
            userName: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20), GenericValidators.noSpacesValidator]],
            email: ["", [Validators.required, GenericValidators.emailValidation]],
            password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16), GenericValidators.passwordValidator]],
            confirmPassword: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            //  phoneNumber: ["", [Validators.minLength(9), Validators.maxLength(11)]],
            branchOfficeId: ["", [Validators.required]],
            chargeId: ["", [Validators.required]],
            userId: ["", [Validators.required]],
            activateUser: [true],
            autoConfirmEmail: [true]
        }, {
            validator: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const passwordControl = formGroup.get('password');
        const confirmPasswordControl = formGroup.get('confirmPassword');

        if (passwordControl && confirmPasswordControl) {
            const password = passwordControl.value;
            const confirmPassword = confirmPasswordControl.value;

            if (password !== confirmPassword) {
                confirmPasswordControl.setErrors({passwordMismatch: true});
            } else {
                confirmPasswordControl.setErrors(null);
            }
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.form.get(controlName);
        if (control.hasError('required')) {
            return 'Este campo es requerido';
        }

        if (control.hasError('minlength')) {
            return `El campo debe tener al menos ${control.getError('minlength').requiredLength} caracteres`;
        }

        if (control.hasError('maxlength')) {
            return `El campo no puede tener más de ${control.getError('maxlength').requiredLength} caracteres`;
        }

        if (control.hasError('emailValidation')) {
            return 'El correo no es válido.';
        }

        if (control.hasError('IsNotTextOrSpace')) {
            return 'El Campo debe ser solo texto.';
        }

        if (control.hasError('InvalidPassword')) {
            return 'La contraseña debe contener números, letras mayúsculas y minúsculas y un carácter especial.';
        }

        if (control.hasError('passwordMismatch')) {
            return 'La contraseña no coinciden.';
        }

        if (control.hasError('hasSpaces')) {
            return ' El Usuario no debe tener espacios.';
        }

        return '';
    }


    /* chargeSelect():void{
      this._chargeService.chargeSelect().subscribe((resp)=>{
        if(resp.succeeded){
          this.ChargeData=resp.data;
        }
      })
    } */

    userSelect(): void {
        this._userService.userSelectList().subscribe((resp) => {
            if (resp.succeeded) {
                this.UserData = resp.data;
            }
        })
    }

    UserRegister(): void {
        this.disableRegisterButton = true;

        if (this.form.invalid) {
            return Object.values(this.form.controls).forEach((controls) => {
                controls.markAllAsTouched();
            });
        }
        this._userService.UserRegister(this.form.value).subscribe((resp) => {
            this.disableRegisterButton = false;
            if (resp.succeeded) {
                //this._alert.success("Excelente", resp.messages);
                //this._notificationService.showSuccess(resp.messages, "Registered in successfully");
                this._dialogRef.close(true);
            } else {
                // this.handleErrors(resp.errors);
                //this._notificationService.showError(resp.messages, "Atención");
            }
        });
    }

    onBlur(formControlName: string) {
        this.form.get(formControlName)?.markAsDirty();
    }


    handleErrors(errors: any[]): void {
        for (const error of errors) {

            this._alert.warn("Atención", `Error in property ${error.propertyName}: ${error.errorMessage}`);
            // this._notificationService.showError(`Error in property ${error.propertyName}: ${error.errorMessage}`, "Register failed");
        }
    }

}
