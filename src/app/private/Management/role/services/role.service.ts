import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "../../../../../environments/environment";
import { endpoint } from "../../../../core/services/apis/endpoint";
import { map } from "rxjs/operators";
import { BaseResponse } from "../../../../core/models/base-api-response.interface";
import { RoleRequest } from "../models/role-request.interface";
import { PermissionRequest } from "../models/permission-request.interface";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  GetAllList(): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LIST_ROLE}`;
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((data: BaseResponse) => {
        return data;
      }));
  }

  PermissionsByRoleId(id: string): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.PERMISSION_BY_ROLEID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  RoleRegister(role: RoleRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_REGISTER}`;
   
    return this._http.post(requestUrl, role).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  RoleUpdate(role: PermissionRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_UPDATE}`;
   
    return this._http.put(requestUrl, role).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  RoleDelete(id: string): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ROLE_DELETE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
}
