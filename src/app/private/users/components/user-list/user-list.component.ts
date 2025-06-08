import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit } from '@angular/core';

import { UserService } from '../../../../core/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserManageComponent } from '../user-manage/user-manage.component';
import { fadeInRight400ms } from '../../../../core/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../core/animations/scale-in.animation';
import { stagger40ms } from '../../../../core/animations/stagger.animation';
import { CustomTitleService } from '../../../../core/services/custom-title.service';
import { componentSettings } from './user-list-config';
import { ShowUserComponent } from '../show-user/show-user.component';
import Swal from 'sweetalert2';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { IdTransferService } from '../../../../core/services/id-transfer.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgPipesModule } from 'ngx-pipes';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ListTableSimpleComponent } from '../../../../core/ui/list-table-simple/list-table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [ListTableSimpleComponent,MatPaginatorModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, FlatpickrModule, SimplebarAngularModule, NgPipesModule, NgbModalModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class UserListComponent implements OnInit {
  component;
  actions: any[]=[];
  stateChange = new EventEmitter<void>();
  registerSuccess = new EventEmitter<void>();
  updateSuccess = new EventEmitter<void>();

  constructor(public _userService:UserService,
    private customTitle: CustomTitleService,
    private _alert: AlertService,
    private _router: Router,
    private _idTransferService:IdTransferService,
    private _dialog: MatDialog){
      this.customTitle.set("Usuarios");
  }

  ngOnInit(): void {
    this.component = componentSettings;
    this.actions = [1,1,1,1,1,0,1,0,0,0,1,0,1];

  }




  openDialogRegister() {
    this._dialog
      .open(UserManageComponent, {
        width: "400px",
        disableClose: true
      }).afterClosed().subscribe((resp) => {
        if (resp) {
          this.registerSuccess.emit(); 
        }
      });
  }

  OpenUpdateUserRole($event: any) {
    this._idTransferService.setSelectedIdKey($event.id);
    this._router.navigate(['/private/users/user-role']);
  }

  
  onChangeState($event: any): void {
    const user = {
      activateUser: !$event.isActive,
      userId: $event.id
    };
    const action = $event.isActive ? 'desactivar' : 'activar';
    const confirmButtonText = $event.isActive ? 'Sí, desactivar' : 'Sí, activar';

    Swal.fire({
      title: `¿Realmente deseas ${action} a ${$event.userName}?`,
      text: `Se ${action}á el registro!`,
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
      width: 400,
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.UserChangeState(user).subscribe(
          (resp) => {
            if (resp.succeeded) {
              this._alert.success('Excelente', resp.messages);
              this.stateChange.emit();  
            } else {
              this._alert.warn('Atención', resp.messages);
            }
          });
      }
    });
  }

  onView($event: any): void {
    this._dialog.open(ShowUserComponent, {
      disableClose: true,
      data: {
        Id: $event.id
      }
    });
  }

  onOpenUpdateProfile($event: any): void {
    this._dialog.open(UpdateProfileComponent, {
      width: "400px",
        disableClose: true,
      data: {
        profileId: $event.id
      }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        this.updateSuccess.emit(); 
      }
    });
  }

  onOpenChangePassword($event: any): void {
    this._dialog.open(ChangePasswordComponent, {
      width: "400px",
        disableClose: true,
      data: {
        profileId: $event.id
      }
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        this.updateSuccess.emit(); 
      }
    });
  }



}
