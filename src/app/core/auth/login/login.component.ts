import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../../shared/service/auth.service";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  auth: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.auth = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.authService.loginUser(this.auth.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        res => {
          localStorage.setItem( 'token', res.token );
          localStorage.setItem( 'name', res.name);
          this.router.navigate(['system/invoice']);
        },
        error => this.toastrService.error(error.error)
      );
  }

  get f() { return this.auth.controls;}

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
