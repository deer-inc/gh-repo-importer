import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import * as Octokit from '@octokit/rest';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSource = new BehaviorSubject<boolean>(false);
  authState$: Observable<boolean> = this.authSource.asObservable();
  token: string = this.getTokenFromLocalStorage();

  constructor() {
    if (this.token) {
      this.checkAuth(this.token);
    }
  }

  checkAuth(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      new Octokit({
        auth: `token ${token}`
      }).issues.list({
        per_page: 1
      }).then((result) => {
        this.authSource.next(true);
        this.setTokenToLocalStorage(token);
        this.token = token;
        resolve(token);
      }).catch((err) => {
        this.authSource.next(false);
        reject();
      });
    });
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

  clearCache() {
    localStorage.issueParams = null;
    localStorage.token = null;
  }
}
