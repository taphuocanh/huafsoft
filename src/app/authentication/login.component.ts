import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationLayoutComponent } from "./authentication-layout.component";
import { AuthenticationService } from "@app/_services";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";

@Component({
  selector: 'huafsoft-authentication-login',
  template: `
    <huafsoft-authentication-layout>
      <h3>Register page</h3>
      <div class="errors" *ngIf="form.errors">
        <ul>
          <!-- <li *ngFor="let error of form.errors">{{error}}</li> -->
        </ul>
      </div>
      <form action="" [formGroup]="form" (ngSubmit)="onSubmit()">
        <label for="username">Username</label>
        <input type="text" formControlName="username" required pattern="[a-zA-Z0-9]*"/><br>

        <!-- <label for="email">Email</label>
        <input type="email" formControlName="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/><br>
        <div *ngIf="form.controls.email.touched && form.controls.email.errors?.['required']">
          Name is required.
        </div> -->
        <!-- <div *ngIf="form.controls.email.dirty && form.controls.email.errors?.['pattern']">
          Name is Pattern.
        </div>
        <div *ngIf="form.controls.email.dirty && form.controls.email.errors?.['email']">
          Name is Email.
        </div> -->
        <label for="password">Password</label>
        <input type="password" formControlName="password" required pattern=".{6,}"/><br>
        <button type="submit" [disabled]="form.invalid && false">Submit</button>
      </form>
    </huafsoft-authentication-layout>
  `,
  imports: [AuthenticationLayoutComponent, ReactiveFormsModule,NgIf],
  providers: [],
  standalone: true
})
export class LoginComponent {
  private readonly formBuider = inject(FormBuilder);
  public form: FormGroup<{
    username: FormControl<string>,
    // email: FormControl<string>,
    password: FormControl<string>
  }> = this.formBuider.nonNullable.group({
    username: ['admin', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    // email: ['admin@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log('Login page init');
  }
  ngOnDestroy() {
    console.log('destroy')
  }

  onSubmit() {
    let that = this;
    if (this.form.invalid) {
      alert('Error submit data.');
      return;
    }

    let sendLoginRequest = this.authenticationService.login(this.form.getRawValue().username, this.form.getRawValue().password).subscribe({
      next: (response) => {
        console.log(response);
        if (that.route.snapshot.queryParams['returnUrl']) {
          that.router.navigate([this.route.snapshot.queryParams['returnUrl']]);
          return false;
        } else {
          that.router.navigate(['/admin']);
          return false;
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        sendLoginRequest.unsubscribe();
      }
    });
    alert('Login')
  }
}


// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//   const user = this.authenticationService.userValue;
//   if (user) {
//       // logged in so return true
//       return true;
//   }

//   // not logged in so redirect to login page with the return url
//   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//   return false;
// }
