import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"

@Injectable()
export class UserLoginService {
  public userLoginURL = 'mock-data/user-login-mock.json';
  public subject: Subject<any> = new Subject<any>();

  constructor(public httpClient: HttpClient) {
  }

  public get currentUser(): Observable<any> {
    return this.subject.asObservable();
  }

  public login(user: any) {
    return this.httpClient
      .get(this.userLoginURL)
      .subscribe(
        data => {
          console.log("login success>" + data);
          let user = data;
          console.log("user object>" + user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.subject.next(Object.assign({}, user));
        },
        error => {
          console.error(error);
        }
      );
  }

  public logout(): void {
    localStorage.removeItem("currentUser");
    this.subject.next(Object.assign({}));
  }
}
