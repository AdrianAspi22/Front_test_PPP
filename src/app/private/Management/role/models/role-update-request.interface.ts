interface RoleClaim {
    id: number;
    roleId: string;
    type: string;
    value: string;
    description: string;
    group: string;
    selected: boolean;
  }
  
export  interface RoleUpdateRequest {
    roleId: string;
    roleClaims: RoleClaim[];
  }