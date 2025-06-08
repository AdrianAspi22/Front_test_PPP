import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";


export const AuthGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  const router = inject(Router);
 

  if (typeof window !== 'undefined') {
    const storedToken = await getStoredToken();
    if (storedToken) {
      return true;
    } else {
      return router.createUrlTree(['login']);
    }
  }

  return false;
};

async function getStoredToken(): Promise<string | null> {

  return new Promise(resolve => {
    setTimeout(() => {
      const token =localStorage.getItem("token");
      resolve(token);
    }, 0);
  });
}



