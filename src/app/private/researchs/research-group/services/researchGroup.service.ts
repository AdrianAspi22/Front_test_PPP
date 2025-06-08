import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { endpoint } from '../../../../core/services/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../../../core/models/base-api-response.interface';
import { ResearchGroupRequest } from '../models/research-group-request.interface';
import { ResearchGroupUpdate } from '../models/research-group-update.interface';

@Injectable({ providedIn: 'root' })
export class ResearchGroupService {

  constructor(private _http: HttpClient) {}


  getAllResearchGroup(queryParams):Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.RESEARCH_GROUP_LIST}`;
    return this._http.post(requestUrl,queryParams).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  researchGroupSelect():Observable<BaseResponse>{
    const requestUrl =`${env.api}${endpoint.RESEARCH_GROUP_SELECT}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchGroupById(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
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

  researchGroupRegister(researchGroup: ResearchGroupRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_REGISTER}`;
    const researchGroupRequest = { request: researchGroup };
    return this._http.post(requestUrl, researchGroupRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }


  researchGroupUpdate(researchGroup: ResearchGroupUpdate): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_UPDATE}`;
    const researchGroupRequest = { updateResearchGroupRequest: researchGroup };
    return this._http.put(requestUrl, researchGroupRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchGroupDelete(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_DELETE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchGroupChangeState(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_CHANGE_STATE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
}
