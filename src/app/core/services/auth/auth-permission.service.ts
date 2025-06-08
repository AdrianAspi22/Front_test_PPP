import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {
  private userRoles: string[] = [];
  userId:string;

  constructor() { 
    this.initializePermissions();
  }
  private initializePermissions(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      this.userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.userRoles = Array.isArray(this.userRoles) ? this.userRoles : [this.userRoles];
    }
  }

   /**
   * Validates if the user has any of the specified roles.
   * @param rolesToValidate Array of roles to check against.
   * @returns True if the user has one of the specified roles, otherwise false.
   */
   public hasValidRoles(rolesToValidate: string[]): boolean {
    return !this.userRoles.some(role => rolesToValidate.includes(role));
  }

  hasValidRole(role: string):  boolean {   
    return this.userRoles.includes(role);
  }

  getUserId() :string{
      return this.userId;
  }
}
