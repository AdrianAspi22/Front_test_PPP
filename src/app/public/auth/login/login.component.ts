import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as jwt_decode from "jwt-decode";
import {RoutesService} from '../../../core/services/routes.service';
import {ToastService} from '../../../core/services/toast-service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgClass, NgIf} from "@angular/common";
import {ToastsContainer} from "../../../core/ui/toast/toasts-container.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIf,
        ToastsContainer
    ],
    standalone: true
})
export class LoginComponent implements OnInit {
    // Login Form
    loginForm!: FormGroup;
    submitted = false;
    fieldTextType!: boolean;
    error = '';
    returnUrl!: string;
    invalidLogin: boolean = false;
    toast!: false;
    disableLoginButton: boolean = false;
    userRoles: string = '';

    // set the current year
    year: number = new Date().getFullYear();

    //rutas alternativas
    logoLight!: string;

    @ViewChild('invalidCredentialsModal') invalidCredentialsModal!: TemplateRef<any>;

    constructor(
        private _fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public toastService: ToastService,
        private routesService: RoutesService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.loadRoutes();
        this.loginForm.valueChanges.subscribe(() => {
            //this.checkFormValidity();
        });
    }

    initForm(): void {
        this.loginForm = this._fb.group({
            userName: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    //Para las rutas alternativas
    loadRoutes(): void {
        this.routesService.getRoutes().subscribe(routes => {
            this.logoLight = routes.logoLight;
        });
    }

    /*   checkFormValidity(): void {
        this.disableLoginButton = this.loginForm.invalid;
      } */

    /**
     * Form submit
     */
    onSubmit() {
        this.disableLoginButton = true;
        this.submitted = true;
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls).forEach(control => {
                control.markAllAsTouched();
            });
            this.toastService.show('Por favor, complete los campos obligatorios.', {classname: 'bg-warning text-light'});
            return;
        }
        this.authService.login(this.loginForm.value).subscribe({

            next: (resp) => {
                this.disableLoginButton = false;
                if (resp.succeeded) {
                    const decodedToken: any = jwt_decode.jwtDecode(resp.data.token);
                    const userRoles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    const redirectPath = this.getRedirectPath(userRoles);
                    this.router.navigate([redirectPath]);
                    this.toastService.show('Inicio de sesión exitoso.', {
                        classname: 'bg-success text-light',
                        delay: 3000
                    });
                    this.modalService.open(' Inicio de sesión exitoso');
                }
            },
            error: (error) => {
                if (error.status === 401) {
                    this.toastService.show('Usuario o contraseña incorrectos.', {
                        classname: 'bg-danger text-light',
                        delay: 5000
                    });
                    this.showInvalidCredentialsModal();
                } else {
                    this.toastService.show('Error al intentar iniciar sesión. Por favor, inténtelo más tarde.', {
                        classname: 'bg-danger text-light',
                        delay: 5000
                    });
                }
            }
        });
    }

    private getRedirectPath(roles: string[]): string {
        return roles.includes('Administrator') ? '/private/home' : '/private/home';
    }

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    /**
     * Show Invalid Credentials Modal
     */
    showInvalidCredentialsModal(): void {
        this.modalService.open(this.invalidCredentialsModal);
    }
}
