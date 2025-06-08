import { Component, EventEmitter, OnInit } from '@angular/core';
import { ListTableSimpleComponent } from '../../../../../core/ui/list-table-simple/list-table.component';

import { fadeInRight400ms } from '../../../../../core/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../core/animations/scale-in.animation';
import { stagger40ms } from '../../../../../core/animations/stagger.animation';
import { RoleResponse } from '../../models/role-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { CustomTitleService } from '../../../../../core/services/custom-title.service';
import { componentSettings } from './role-list-config';
import { RoleRegisterComponent } from '../role-register/role-register.component';
import { Router } from '@angular/router';
import { IdTransferService } from '../../../../../core/services/id-transfer.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../../../../core/services/alert.service';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList} from "@angular/material/list";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [ListTableSimpleComponent, MatCardContent, MatList, MatTooltip, MatButton, MatCard, MatCardHeader],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class RoleListComponent implements OnInit {

  deleteRole = new EventEmitter<void>();
  registerRole = new EventEmitter<void>();

  component;

  roleData: RoleResponse[] = [];
  actions: any[] = [];

  constructor(public _dialog: MatDialog,
    public _roleService: RoleService, 
    private _alterService:AlertService,
    private customTitle: CustomTitleService,
    private _router: Router,
    private _idTransferService:IdTransferService
  ) {
    this.customTitle.set("Roles");

  }

  ngOnInit(): void {
    this.component = componentSettings;
    this.actions = [0, 0, 0, 1,0,1];
  }


  openDialogRegister() {
    this._dialog.open(RoleRegisterComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed().subscribe((resp) => {
        if(resp){
          this.registerRole.emit();
        }
          
      }
      );
  }

  OpenDialogPermissionUpdate($event: any) {
    this._idTransferService.setSelectedIdKey($event.id);
    this._router.navigate(['/private/roles/update-permissions']);
  }

  onDelete($event: any): void {
    Swal.fire({
      title: `¿Realmente deseas eliminar a ${$event.name}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 400,
    }).then((result) => {
      if (result.isConfirmed) {
        this._roleService.RoleDelete($event.id).subscribe((resps) => {
            if (resps.succeeded) {
              this._alterService.success("Excelente",resps.messages)
              this.deleteRole.emit();
            }else{
              this._alterService.error("Atención",resps.messages);
            }
          });
      }
    });
  }
}
