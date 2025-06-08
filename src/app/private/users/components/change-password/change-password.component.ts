import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {AlertService} from '../../../../core/services/alert.service';

import {UserService} from '../../../../core/services/user/user.service';
import {GenericValidators} from '../../../../core/utils/validators/generic-validators';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [
        MatDialogActions,
        MatError,
        MatButton,
        MatDialogClose,
        MatIcon,
        MatIconButton,
        MatSuffix,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        MatFormField,
        MatDivider,
        MatDialogContent,
        MatDialogTitle,
        NgIf
    ],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

    disableRegisterButton: boolean;
    ocultarPassword: boolean = true;
    ocultarNewPassword: boolean = true;
    ocultarNewPasswordConfirm: boolean = true;


    form: FormGroup;
    profileId: string = "";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _fb: FormBuilder,
        private _alert: AlertService,
        private _userService: UserService,
        private _dialogRef: MatDialogRef<ChangePasswordComponent>
    ) {

    }

    ngOnInit(): void {
        if (this.data != null) {
            this.profileId = this.data.profileId;
        }
        this.initForm();
    }

    initForm(): void {

        this.form = this._fb.group({
            profileId: [this.profileId, [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), GenericValidators.passwordValidator]],
            confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
        }, {
            validator: this.passwordMatchValidator
        });

    }

    passwordMatchValidator(formGroup: FormGroup) {
        const passwordControl = formGroup.get('newPassword');
        const confirmPasswordControl = formGroup.get('confirmNewPassword');

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
        if (control.hasError('InvalidPassword')) {
            return 'La contraseña debe contener números, letras mayúsculas y minúsculas y un carácter especial.';
        }

        if (control.hasError('passwordMismatch')) {
            return 'La contraseña no coinciden.';
        }

        return '';
    }

    changePassword(): void {
        this.disableRegisterButton = true;

        if (this.form.invalid) {
            return Object.values(this.form.controls).forEach((controls) => {
                controls.markAllAsTouched();
            });
        }

        const formValue = this.form.getRawValue();

        this._userService.changePassword(formValue).subscribe((resp) => {
            this.disableRegisterButton = false;
            if (resp.succeeded) {
                this._alert.success('Excelente', resp.messages);
                this._dialogRef.close(true);
            } else {
                this._alert.warn('Atención', resp.messages);
            }
        });
    }

    onBlur(formControlName: string) {
        this.form.get(formControlName)?.markAsDirty();
    }


}
