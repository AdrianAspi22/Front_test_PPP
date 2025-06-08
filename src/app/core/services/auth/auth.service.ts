import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../../models/login.interface";
import { Observable, BehaviorSubject, Subject, throwError } from "rxjs";
import { environment as env } from "../../../../environments/environment";
import { endpoint, httpOptions } from "../apis/endpoint";
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { TokenStorageService } from "../token-storage.service";
import { BaseResponse } from '../../models/base-api-response.interface';

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private user: BehaviorSubject<BaseResponse>;

  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient, private _router: Router,private _tokenStorageService:TokenStorageService) {
   
    if (typeof window !== 'undefined') {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      this.user = new BehaviorSubject<BaseResponse>(storedToken || null);
     
      if (storedToken) {
        
        this.user.next(storedToken);
      }
    }

    this.$refreshToken.subscribe((res:any)=> {
      this.getRefreshToken()
    })

  }

  login(req: Login): Observable<BaseResponse> {
    
    const requestUrl = `${env.api}${endpoint.LOGIN}`;

   /*  const tenant = window.location.hostname.split(".")[0];
    const httpOptions = this.createHttpOptionsWithTenant(tenant); */

    return this.http.post<BaseResponse>(requestUrl, req, httpOptions).pipe(
      map((resp: BaseResponse) => {
        if (resp.succeeded) {
          const decodedToken: any = jwt_decode.jwtDecode(resp.data.token);
          console.log('Token decodificado:', decodedToken);

          const expTimestamp = decodedToken["exp"] * 1000;
          const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          const userName = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"];
          const actorId = decodedToken["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"];
          
          // Almacenar en localStorage
          localStorage.setItem("token", JSON.stringify(resp.data.token));
          localStorage.setItem("refreshToken", JSON.stringify(resp.data.refreshToken));
          localStorage.setItem("tokenExpiryTime", expTimestamp.toString());
          localStorage.setItem("userName", userName.toString());
          localStorage.setItem("actorId", actorId.toString());
          
          // Guardar userId con la nueva ruta
          if (userId) {
            console.log('UserId guardado:', userId);
            localStorage.setItem("userId", userId.toString());
          } else {
            console.warn('No se encontró userId en el token');
          }

          this.user.next(resp.data.token);
        }

        return resp;
      }),
      catchError(this.handleError)
    );
  }

  public get userToken(): BaseResponse {
    if(this.user != null){
      return this.user?.value || null;
    }else{
      return null;
    }
    
    
   
  }

/*   private createHttpOptionsWithTenant(tenant: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'tenant': tenant 
      })
    };
  } */

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("sede");
    localStorage.removeItem("tokenExpiryTime");
    localStorage.removeItem("selectedIdKey");
    localStorage.removeItem("userName");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("actorId");
    
    this.user.next(null);
    this._router.navigate(['login']);
    window.location.reload();
  }

  isTokenExpired(tokenExpiryTime:number): boolean {
    const currentTime = new Date();
    const expireTime = new Date(tokenExpiryTime);
    //currentTime.setMinutes(currentTime.getMinutes() - currentTime.getTimezoneOffset());
    //expireTime.setMinutes(expireTime.getMinutes() - expireTime.getTimezoneOffset());
    //console.log("Date: ",`${currentTime} -- ${expireTime}`);
    return currentTime > expireTime;
    
  }


  getRefreshToken()   {
    const requestUrl = `${env.api}${endpoint.REFRSHTOKEN}`;
    const token =   this._tokenStorageService.getToken();
    const refreshToken =   this._tokenStorageService.getRefreshToken();
    const obj = {
      "token": token,
      "refreshToken": refreshToken
    };

    this.http.post(requestUrl, obj).subscribe((Res:any)=>{
      //localStorage.setItem('token', JSON.stringify(Res.data.token));
      this._tokenStorageService.saveToken(Res.data.token);
      this.$refreshTokenReceived.next(true);
    })
  }


  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.messages ? error.error.messages[0] : 'Server Error';
    }
    return throwError(() => new Error(errorMessage));
  }
}
