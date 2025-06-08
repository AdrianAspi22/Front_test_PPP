import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private permissions: string[] = [];


  
  constructor() {

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if(token){
      const decodedToken: any = jwt_decode.jwtDecode(token);
      this.permissions = decodedToken["Permission"] || [];
      this.permissionsSubject.next(this.permissions); 
    }
  }
    
   }

  hasPermission(permission: string):  boolean {   
    return this.permissions.includes(permission);
  }
  
  hasAnyPermission(requiredPermissions: string[]): boolean {
    return requiredPermissions.some(permission => this.permissions.includes(permission));
  }

  getPermissions(): string[] {
    return this.permissions;
  }

   

  updatePermissions(token: string): void {
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      this.permissions = decodedToken["Permission"] || [];
      this.permissionsSubject.next(this.permissions); 
    } else {
      this.permissions = [];
      this.permissionsSubject.next(this.permissions); 
    }
  }

}
