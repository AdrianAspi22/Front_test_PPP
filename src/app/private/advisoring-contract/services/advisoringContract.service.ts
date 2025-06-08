import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoint } from '../../../core/services/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../../core/models/base-api-response.interface';
import { environment as env } from './../../../../environments/environment';
import { AdvisoringContractRequest } from './../models/advisoring-contract-request.interface';


@Injectable({ providedIn: 'root' })
export class AdvisoringContractService {

  constructor(private _http: HttpClient) {}


  getAllAdvisoringContract(queryParams):Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.ADVISORINGCONTRACT_LIST}`;
    return this._http.post(requestUrl,queryParams).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchGroupFiltered():Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.RESEARCH_GROUP_FILTERED}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AdvisoringContractRegister(advisoringContract: AdvisoringContractRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ADVISORINGCONTRACT_REGISTER}`;
    const AdvisoringContractRequest = { request: advisoringContract };
    return this._http.post(requestUrl, AdvisoringContractRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  AdvisoringContractDelete(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ADVISORINGCONTRACT_DELETE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
}
