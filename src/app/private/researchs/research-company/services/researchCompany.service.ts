import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { endpoint } from '../../../../core/services/apis/endpoint';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../../../../core/models/base-api-response.interface';
//import { ResearchCompanyRequest } from '../models/research-company-request.interface';

@Injectable({ providedIn: 'root' })
export class ResearchCompanyService {

    constructor(private _http: HttpClient) { }


    getAllResearchCompany(queryParams): Observable<BaseResponse> {
        const requestUrl = `${env.api}${endpoint.RESEARCH_COMPANY_LIST}`;
        return this._http.get<BaseResponse>(requestUrl, { params: queryParams });
    }


    researchCompanySelect(): Observable<BaseResponse> {
        const requestUrl = `${env.api}${endpoint.RESEARCH_COMPANY_SELECT}`;
        return this._http.get(requestUrl).pipe(
            map((resp: BaseResponse) => {
                return resp;
            })
        );
    }

    researchCompanyById(id: number): Observable<BaseResponse> {
        const requestUrl = `${env.api}${endpoint.RESEARCH_COMPANY_BY_ID}${id}`;
        return this._http.get(requestUrl).pipe(
            map((resp: BaseResponse) => {
                return resp;
            })
        );
    }


}
