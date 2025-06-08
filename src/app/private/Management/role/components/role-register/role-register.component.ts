import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoleService} from '../../services/role.service';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {GenericValidators} from '../../../../../core/utils/validators/generic-validators';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-role-register',
    standalone: true,
    imports: [
        MatDialogActions,
        MatLabel,
        MatError,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        MatDialogContent,
        MatDivider,
        MatIcon,
        MatDialogClose,
        MatIconButton,
        MatDialogTitle,
        MatButton,
        NgIf
    ],
    templateUrl: './role-register.component.html',
    styleUrl: './role-register.component.scss'
})
export class RoleRegisterComponent {
    disableRegisterButton: boolean = false;

    form: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _roleService: RoleService,
        public _dialogRef: MatDialogRef<RoleRegisterComponent>,
    ) {
        this.initForm();


    }

    initForm(): void {
        this.form = this._fb.group({
            name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(100), GenericValidators.noSpacesValidator]],
            description: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(255), GenericValidators.onlyTextAndSpaceValidator]],

        });

    }


    RoleRegister(): void {
        this.disableRegisterButton = true;

        if (this.form.invalid) {
            return Object.values(this.form.controls).forEach((controls) => {
                controls.markAllAsTouched();
            });
        }
        this._roleService
            .RoleRegister(this.form.value)
            .subscribe((resp) => {
                this.disableRegisterButton = false;
                if (resp.succeeded) {
                    //this._notificationService.showSuccess(resp.messages, "Register in successfully");
                    this._dialogRef.close(true);
                } else {
                    //this._notificationService.showError(resp.messages, "Register failed");
                }
            });
    }

}
