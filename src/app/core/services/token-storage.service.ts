import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const SEDE_KEY='sede';
const REFRESHTOKEN_KEY='refreshToken';
const TOKENEXPIRYTIME_KEY='tokenExpiryTime';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user.toString());
  }

  public getUser(): any | null {
    return sessionStorage.getItem(USER_KEY);    
   
  }

  public saveSede(sede: any): void {
    window.sessionStorage.removeItem(SEDE_KEY);
    window.sessionStorage.setItem(SEDE_KEY, sede.toString());
  }

  public getSede(): string | null {
    return sessionStorage.getItem(SEDE_KEY);
  }

  public saveRefreshToken(refreshToken: any): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, JSON.stringify(refreshToken));
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveTokenExpiryTime(tokenExpiryTime: any): void {
    window.sessionStorage.removeItem(TOKENEXPIRYTIME_KEY);
    window.sessionStorage.setItem(TOKENEXPIRYTIME_KEY, tokenExpiryTime.toString());
  }

  public getTokenExpiryTime(): string | null {
    return sessionStorage.getItem(TOKENEXPIRYTIME_KEY);
  }


}
