import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {AuthService} from "../../../shared/service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MustPassword} from "../../../shared/validators/must-password";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit,OnDestroy {

  auth: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.auth = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ], this.uniqueEmail.bind(this)],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      secondPassword: ['', Validators.required]
    }, {
      validator: MustPassword('password', 'secondPassword')
    });
  }

  uniqueEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.validateMail(control.value)
      .pipe(map((res: string | null) => {
          if (res !== null) {
            return {
              invalidEmail: true
            };
          }
          return null;
        })
      );
  }

  submit() {
    this.authService.regUser(this.auth.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.router.navigate(['auth/login']);
          this.toastrService.success('Account is registered');
        },
        () => this.toastrService.error('Account registration failed')
      );
  }

  get f() { return this.auth.controls; }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
