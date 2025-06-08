import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { endpoint } from '../../../../core/services/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../../../core/models/base-api-response.interface';
import { ResearchAreaRequest } from '../models/research-area-request.interface';
import { ResearchAreaUpdate } from '../models/research-area-update.interface';
import { ResearchGroupAcronymModel } from '../models/researchGroupAcronym.interface';

@Injectable({ providedIn: 'root' })
export class ResearchAreaService {

  constructor(private _http: HttpClient) { }


  getAllResearchArea(queryParams): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_LIST}`;
    return this._http.post(requestUrl, queryParams).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  researchAreaSelect(): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_SELECT}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchAreaById(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchAreaRegister(researchArea: ResearchAreaRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_REGISTER}`;
    const researchAreaRequest = { request: researchArea };
    return this._http.post(requestUrl, researchAreaRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  
  researchAreaUpdate(researchArea: ResearchAreaUpdate): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_UPDATE}`;
    const researchAreaRequest = { updateResearchAreaRequest: researchArea };
    return this._http.put(requestUrl, researchAreaRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchAreaDelete(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_DELETE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchAreaChangeState(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_AREA_CHANGE_STATE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  getAcronyms(): Observable<ResearchGroupAcronymModel[]> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_SELECT_ACRONYM}`;
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => resp.data as ResearchGroupAcronymModel[])
    );
  }

}
