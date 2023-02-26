import { Component } from "@angular/core";
import { AuthenticationLayoutComponent } from "./authentication-layout.component";

@Component({
  selector: 'huafsoft-authentication-login',
  template: `
    <huafsoft-authentication-layout>
      Login page
    </huafsoft-authentication-layout>
  `,
  imports: [AuthenticationLayoutComponent],
  standalone: true
})
export class LoginComponent {
  ngOnInit() {
    console.log('Login page init');
  }
  ngOnDestroy() {
    console.log('destroy')
  }
}
