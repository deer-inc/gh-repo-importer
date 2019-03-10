import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Octokit from '@octokit/rest';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSource = new BehaviorSubject<boolean>(false);
  authState$: Observable<boolean> = this.authSource.asObservable();
  token: string = this.getTokenFromLocalStorage();

  constructor() { }

  checkAuth(): string {
    this.authSource.next(!!this.token);
    return this.token;
  }

  login(token: string) {
    this.setTokenToLocalStorage(token);
    this.authSource.next(true);
  }

  setTokenToLocalStorage(token: string): void {
    localStorage.token = CryptoJS.AES.encrypt(token, 'wmUHW3v4').toString();
  }

  getTokenFromLocalStorage(): string {
    if (localStorage.token) {
      const bytes  = CryptoJS.AES.decrypt(localStorage.token, 'wmUHW3v4');
      return bytes.toString(CryptoJS.enc.Utf8);
    } else {
      return null;
    }
  }
}
