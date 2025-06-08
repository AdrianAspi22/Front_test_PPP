import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";
import { AlertService } from "../alert.service";



export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(AuthService);
  const alertService = inject(AlertService);
 // const tenant = window.location.hostname.split(".")[0];

  if (userService.userToken) {
    const tokenExpireTime = localStorage.getItem("tokenExpiryTime");;
    const timestamp = tokenExpireTime ? parseInt(tokenExpireTime, 10) : null;

    if (userService.isTokenExpired(timestamp)) {
      alertService.success("SESSIÓN","Your session has expired." );
      userService.logout();
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.userToken}`,
        //tenant: tenant
      }
    });
   
    return next(authReq);


  }

  return next(req);

};




