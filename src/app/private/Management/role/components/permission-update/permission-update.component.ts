import { Component, OnInit } from '@angular/core';
import { IdTransferService } from '../../../../../core/services/id-transfer.service';
import { RoleService } from '../../services/role.service';
import { CustomTitleService } from '../../../../../core/services/custom-title.service';
import { PermissionRequest, RoleClaimRequest } from '../../models/permission-request.interface';
import { fadeInRight400ms } from '../../../../../core/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../core/animations/scale-in.animation';
import { stagger40ms } from '../../../../../core/animations/stagger.animation';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import { PermissionResponse, } from '../../models/role-claims-response.interface';
import * as jwt_decode from 'jwt-decode';
import { AuthPermissionService } from '../../../../../core/services/auth/auth-permission.service';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCard} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-permission-update',
  standalone: true,
  imports: [FormsModule, MatIcon, MatButton, MatTooltip, MatCard, NgForOf, MatCheckbox, NgIf],
  templateUrl: './permission-update.component.html',
  styleUrl: './permission-update.component.scss',
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class PermissionUpdateComponent implements OnInit {
  disableRegisterButton: boolean = false;
  roleId: string;
  userId:string;

  permissionData: PermissionResponse; 

  entities: string[] = [];
  actions: string[] = [];
  permissionsMap: { [key: string]: { [key: string]: { selected: boolean; disabled: boolean } } } = {};
  
  constructor(private _idTransferService: IdTransferService,
    private _roleService: RoleService,
    private _customtitle: CustomTitleService,
    private _authPermissionService:AuthPermissionService,
    private _router: Router) {
    this._customtitle.set('Actualizar Permisos');
  }

  ngOnInit(): void {
    this.roleId = this._idTransferService.getSelectedIdKey();
    
    this.getPermissionByRoleId();

    this.userId = this._authPermissionService.getUserId();

  }

  getPermissionByRoleId(): void {
    this._roleService.PermissionsByRoleId(this.roleId.toString()).subscribe((res) => {
      if (res.succeeded) {
        this.permissionData = res.data;

        
        this.entities = [...new Set(this.permissionData.roleClaims.map(p => p.group))];
        this.actions = [...new Set(this.permissionData.roleClaims.map(p => p.value.split('.').pop()!))];
     

        this.entities.forEach(entity => {
          this.permissionsMap[entity] = {};

          this.actions.forEach(action => {
            const permission = this.permissionData.roleClaims.find(p => p.group === entity && p.value.includes(action));
            this.permissionsMap[entity][action] = {
              selected: permission ? permission.selected : false,
              disabled: !permission 
            };
          });
        });
      }
    });
  }
  
  EditPermissionByRoleId(): void {
      if (!this.permissionData || !this.permissionData.roleId) {
        return;
      }

        this.disableRegisterButton = true;    

        const roleClaims: RoleClaimRequest[] = this.permissionData.roleClaims.map((originalClaim) => {
          const entity = originalClaim.group;
          const action = originalClaim.value.split('.').pop(); 
      
          const permissionState = this.permissionsMap[entity]?.[action];
      
          return {
            id: originalClaim.id,
            roleId: originalClaim.roleId,
            type: originalClaim.type,
            value: originalClaim.value,
            description: originalClaim.description,
            group: entity,
            selected: permissionState ? permissionState.selected : originalClaim.selected 
          };
        });
      
        const permissionRequest: PermissionRequest = {
          roleId: this.permissionData.roleId,
          roleClaims: roleClaims
        };

    
    this._roleService.RoleUpdate(permissionRequest).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        //this._notificationService.showSuccess(resp.messages, "Excelente")
        localStorage.removeItem("selectedIdKey");
        this._router.navigate(['/private/roles']);
      } else {
        //this._notificationService.showError(resp.messages, "Atención");
      }
    });

  }

  onCheckboxChange(entity: string, action: string, event: MatCheckboxChange): void {
    if (!this.permissionsMap[entity][action].disabled) {
      this.permissionsMap[entity][action].selected = event.checked;
    }
  }

  hasActions(entity: string): boolean {
    return Object.values(this.permissionsMap[entity]).some(permission => !permission.disabled);
  }



 
  
}
