import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseService} from '../API/api-base.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UsersModel} from "../model/users.model";


@Injectable()
export class AuthService extends ApiBaseService {
  constructor(
    public  http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  validateMail( mail: string ): Observable<any> {
    return this.post('checkEmailNotTaken', {mail});
  }

  regUser( user: UsersModel ): Observable<any> {
    return this.post('createuser', user);
  }

  loginUser(user: UsersModel ): Observable<any> {
    return this.post('login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

}
