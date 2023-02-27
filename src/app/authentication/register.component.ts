import { UserService } from './../_services/user.service';
import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationLayoutComponent } from "./authentication-layout.component";

@Component({
  selector: 'huafsoft-authentication-register',
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

        <label for="email">Email</label>
        <input type="email" formControlName="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/><br>
        <div *ngIf="form.controls.email.touched && form.controls.email.errors?.['required']">
          Name is required.
        </div>
        <div *ngIf="form.controls.email.dirty && form.controls.email.errors?.['pattern']">
          Name is Pattern.
        </div>
        <div *ngIf="form.controls.email.dirty && form.controls.email.errors?.['email']">
          Name is Email.
        </div>
        <label for="password">Password</label>
        <input type="password" formControlName="password" required pattern=".{6,}"/><br>
        <button type="submit" [disabled]="form.invalid && false">Submit</button>
      </form>
    </huafsoft-authentication-layout>
  `,
  imports: [ReactiveFormsModule ,AuthenticationLayoutComponent, NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RegisterComponent {
  private readonly formBuider = inject(FormBuilder);
  public form: FormGroup<{
    username: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>
  }> = this.formBuider.nonNullable.group({
    username: ['admin', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['admin@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.userService.addNew({
      username: this.form.getRawValue().username,
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password
    }).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        this.form.setErrors([e])
      },
      complete: () => console.info('complete')
    })
  }
}
