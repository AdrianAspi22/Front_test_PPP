import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { endpoint } from '../../../../core/services/apis/endpoint';
import { catchError, map } from 'rxjs/operators';
import { BaseResponse } from '../../../../core/models/base-api-response.interface';
import { ResearchLineRequest } from '../models/research-line-request.interface';
import { ResearchLineUpdate } from '../models/research-line-update.interface';
import { ResearchGroupAcronymRLineModel } from '../models/researchGroupAcronym-RLine.interface';
import { ResearchAreaModel, ResearchGroupModel } from '../models/researchArea.interface';


@Injectable({ providedIn: 'root' })
export class ResearchLineService {

  constructor(private _http: HttpClient) { }


  getAllResearchLine(queryParams): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_LIST}`;
    return this._http.post(requestUrl, queryParams).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }
  researchLineSelect(): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_SELECT}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchLineById(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchLineRegister(researchLine: ResearchLineRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_REGISTER}`;
    const researchLineRequest = { request: researchLine };
    return this._http.post(requestUrl, researchLineRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }


  researchLineUpdate(researchLine: ResearchLineUpdate): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_UPDATE}`;
    const researchLineRequest = { updateResearchLineRequest: researchLine };
    return this._http.put(requestUrl, researchLineRequest).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchLineDelete(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_DELETE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  researchLineChangeState(id: number): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_LINE_CHANGE_STATE}${id}`;
    return this._http.delete(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  getAcronyms(): Observable<ResearchGroupAcronymRLineModel[]> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_SELECT_ACRONYM}`;
    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => resp.data as ResearchGroupAcronymRLineModel[])
    );
  }

  researchAreaByGroup(groupId: number): Observable<ResearchAreaModel[]> {
    const requestUrl = `${env.api}${endpoint.RESEARCH_GROUP_BY_GROUP}${groupId}`;
    return this._http.get<ResearchGroupModel[]>(requestUrl).pipe(
      map((resp: ResearchGroupModel[]) => {
        const group = resp.find((g: ResearchGroupModel) => g.researchGroupId === Number(groupId));
        if (group && Array.isArray(group.researchAreas)) {
          return group.researchAreas;
        } else {
          return [];
        }
      }),
    );
  }
}
