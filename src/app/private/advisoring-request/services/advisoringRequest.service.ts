import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoint } from '../../../core/services/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../../core/models/base-api-response.interface';
import { environment as env } from './../../../../environments/environment';
import { AdvisoringRequestRegister } from '../models/advisoring-request.interface';


@Injectable({ providedIn: 'root' })
export class AdvisoringRequestService {

  constructor(private _http: HttpClient) {}


  getAllAdvisoringRequest(queryParams):Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.ADVISORINGREQUEST_LIST}`;
    return this._http.post(requestUrl,queryParams).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  advisoringRequestSelect():Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.ADVISORINGREQUEST_SELECT}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  advisoringRequestById(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ADVISORINGREQUEST_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AdvisoringRequestRegister(AdvisoringRequest: AdvisoringRequestRegister): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ADVISORINGREQUEST_REGISTER}`;
    const AdvisoringRequestRequest = { request: AdvisoringRequest };
    return this._http.post(requestUrl, AdvisoringRequestRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AdvisoringRequestDelete(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ADVISORINGCONTRACT_LIST}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
}
