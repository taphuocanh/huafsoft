import {Component, inject, OnInit} from "@angular/core";
import {LayoutComponent} from "@app/admin/layout.component";
import {AuthenticationService} from "@app/_services";
import {NgClass} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'huafsoft-admin-authentication-login',
  template: `
    <div class="huafsoft-admin-authentication-login-wrapper widget">
      <h1 class="widget-title">Đăng nhập</h1>
      <p>Dành cho quản trị viên</p>
      <hr>
      <form action="" [ngClass]="{'huafsoft-form': true}" [formGroup]="loginForm" (ngSubmit)="submit()">
        <div class="form-control">
          <label for="email" class="form-label">Địa chỉ Email:</label>
          <input type="email" name="email" class="form-field" [formControl]="loginForm.controls.email" required>
        </div>
        <div class="form-control">
          <label for="password" class="form-label">Mật khẩu:</label>
          <input type="password" name="password" class="form-field" [formControl]="loginForm.controls.password" required>
        </div>
        <div class="d-flex">
        <a href="/admin/reset-password">Lấy lại mật khẩu</a>
        <button type="submit" class="ms-auto">Đăng nhập</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['login.component.scss'],
  imports: [
    LayoutComponent,
    NgClass,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup<{
    email: FormControl<string>,
    password: FormControl<string>
  }> = this.formBuilder.nonNullable.group({
    email: ['admin@taphuocanh.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('Login page initialized.');
  }

  ngOnDestroy() {
    console.log('Login page destroyed.');
  }

  submit(): void {
    let that = this;
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password)
      .pipe()
      .subscribe({
        next: (response) => {
          return that.router.navigate([that.activatedRoute.snapshot.params['returnUrl'] || '/admin']);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Submit complete')
        }
      })
  }
}
