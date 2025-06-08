import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "../../../../environments/environment";
import { endpoint } from '../apis/endpoint';
import { map } from "rxjs/operators";
import { BaseResponse } from "../../models/base-api-response.interface";
import { UserDto } from "../../models/user/userDto.interface";
import { UserRegisterRequest } from "../../models/user/user-request.interface";
import { UserUpdateRequest } from "../../models/user/user-update.interface";
import { UpdateProfileRequest } from "../../models/user/update-profile.interface";
import { ChangePasswordRequest } from "../../models/user/change-password.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  GetAllList(): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LIST_USERS}`;  

      return this._http.get<BaseResponse>(requestUrl).pipe(
        map((data: BaseResponse) => {
          if (data.data) {
            data.data.forEach(function (e: UserDto) {
              switch (e.isActive) {
                case false:
                  e.badgeColor = "bg-red-100 text-red-800 dark:bg-red-100 dark:text-red-600";
                  break;
                case true:
                  e.badgeColor = "bg-green-100 text-green-800  dark:bg-green-100 dark:text-green-600";
                  break;
                default:
                  e.badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-100 dark:text-blue-600";
                  break;
              }
  
            });
          }
  
          return data;
        }));
  }

 

  userSelectList(): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.SELECT_LIST_USERS}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  UserById(id: any): Observable<any> {
    const requestUrl = `${env.api}${endpoint.USER_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserByBrnachOfficeId(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_BY_BRANCHOFFICEID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  UserRegister(user:  UserRegisterRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_REGISTER}`;
    return this._http.post(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }



  UserRolesById(id: any): Observable<any> {
    const requestUrl = `${env.api}${endpoint.USER_ROLES_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserRolesUpdate(userId:string,userRoles: UserUpdateRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_ROLES_UPDATE_BY_ID}${userId}`;

    return this._http.put(requestUrl, userRoles).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  UserChangeState(user: any): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.USER_ACTIVATE}`;
    return this._http.post(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  updateProfile(user:UpdateProfileRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.UPDATE_PROFILE}`;
    return this._http.put(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }


  changePassword(user:ChangePasswordRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.CHANGE_PASSWORD}`;
    return this._http.put(requestUrl, user).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
}
