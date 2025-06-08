import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

export const RoleGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {

  const router = inject(Router);

  const requiredPermission:string[] = route.data['requiredPermission'] || []; 


  if (typeof window !== 'undefined') {
    const storedToken = await getStoredToken();
    if (storedToken) {
      const decodedToken: any = jwt_decode.jwtDecode(storedToken);
      const userPermission: string[] = decodedToken["Permission"] || [];

      // Validamos si el usuario tiene al menos uno de los permisos requeridos
      const hasPermission = requiredPermission.length === 0 
      ? true // Si no se especifican permisos, se permite el acceso
      : requiredPermission.some(permission => userPermission.includes(permission)); 

      if (hasPermission) {
        return true;
      }
    }
  }
  return router.parseUrl('/private/home');
};


async function getStoredToken(): Promise<string | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      resolve(token);
    }, 0);
  });
}


