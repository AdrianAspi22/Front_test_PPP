export interface RoleClaim {
    id: number;
    roleId?: any;
    type: string;
    value: string;
    description: string;
    group: string;
    selected: boolean;
  }

  export interface PermissionResponse {
    roleId: string;
    roleName: string;
    roleClaims: RoleClaim[];
  }