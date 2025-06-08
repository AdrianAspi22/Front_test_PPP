interface UserRole {
    roleName: string;
    roleDescription: string;
    selected: boolean;
  }

  export interface UserUpdateRequest {
    userId: string;
    userRoles: UserRole[];
  }