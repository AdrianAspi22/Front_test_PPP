export class RoleClaimResponse {
    id:number;
    roleId: string;
    type: string;
    value: string;
    description: string;
    group: string;
    selected: boolean;

    constructor(init?: Partial<RoleClaimResponse>) {
        Object.assign(this, init);
    }
}

/* export class PermissionResponse {
    roleId: string;
    roleName: string;
    roleClaims: RoleClaimResponse[];

    constructor(init?: Partial<PermissionResponse>) {
        Object.assign(this, init);
    }
} */


export interface RoleClaimsResponse{
    id:number;
    roleId: string | null;
    type: string;
    value: string;
    description: string;
    group: string;
    selected: boolean;
}

export class PermissionResponse {
    roleId: string;
    roleName: string;
    roleClaims: RoleClaimsResponse[];


}
