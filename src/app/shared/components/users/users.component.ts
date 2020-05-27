import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUsersName();
  }

  logOut() {
    this.authService.logoutUser();
  }

  getUsersName() {
    this.user = localStorage.getItem('name');
  }

}
