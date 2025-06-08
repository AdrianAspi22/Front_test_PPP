import { Component, OnInit } from '@angular/core';
import { IdTransferService } from '../../../../core/services/id-transfer.service';
import { UserUpdateRequest } from '../../../../core/models/user/user-update.interface';
import { CustomTitleService } from '../../../../core/services/custom-title.service';
import { UserService } from '../../../../core/services/user/user.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { RoleResponse } from '../../../../core/models/user/role-response.interface';

import { UserByIdResponse } from '../../../../core/models/user/user-reponse-by-id.inertface';
import { fadeInRight400ms } from '../../../../core/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../core/animations/scale-in.animation';
import { stagger40ms } from '../../../../core/animations/stagger.animation';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-roles-update',
  standalone: true,
  imports: [
    MatCheckbox,
    MatCardContent,
    MatList,
    MatCardHeader,
    MatCard,
    MatIcon,
    MatButton,
    MatTooltip,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './user-roles-update.component.html',
  styleUrl: './user-roles-update.component.scss',
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class UserRolesUpdateComponent implements OnInit {
  disableRegisterButton: boolean = false;
  userId: string;

  selectedStates: boolean[] = [];
  stateValue: boolean[] = [];
  isAnyCheckboxChecked: boolean = false;
  roleData: RoleResponse[]=[];
  userData:UserByIdResponse;

  userName:string;

  constructor(
    private _idTransferService: IdTransferService,
    private _userService:UserService,
    private _alert:AlertService,
    private _customtitle: CustomTitleService,
    private _router: Router
  ){
    this._customtitle.set('User Role');
  }


  ngOnInit(): void {
    this.userId = this._idTransferService.getSelectedIdKey();
    this.getRole();
    this.getUser();

    if (this.roleData) {
      this.selectedStates = this.roleData.map(() => false);
      this.stateValue = this.roleData.map(() => false);
    }
  }

getUser():void{
  this._userService.UserById(this.userId).subscribe((resp)=>{
    if(resp.succeeded){
      this.userData=resp.data;
      this.userName=this.userData.userName;
    }
  })
}

  getRole():void{
    this._userService.UserRolesById(this.userId).subscribe((resp)=>{
      if(resp.succeeded){
        this.roleData=resp.data.userRoles;
        this.selectedStates = this.roleData.map((role => role.selected));
        this.stateValue = this.roleData.map((role => role.selected));
      }
    })
  }

  onCheckboxChange() {
    this.isAnyCheckboxChecked = this.selectedStates.some(state => state);
  }

  UpdateRoleUser(): void {
    if (!this.roleData) {
      return;
    }
    this.disableRegisterButton = true;
    
      const userRequest: UserUpdateRequest = {
        userId: this.userId,
        userRoles: this.roleData.map((role, index) => {
          return {
            roleName: role.roleName,
            roleDescription: role.roleDescription,
            selected: this.selectedStates[index] || false
          };
        })
      };

    this._userService.UserRolesUpdate(this.userId,userRequest).subscribe((resp) => {
      this.disableRegisterButton = false;
      if (resp.succeeded) {
        this._alert.success("Excelente",resp.messages);
        this.selectedStates = [];
        localStorage.removeItem("selectedIdKey");
        this._router.navigate(['/private/users']);
      } else {
        this._alert.error("Atención",resp.messages);
      }
    });

  }
}
