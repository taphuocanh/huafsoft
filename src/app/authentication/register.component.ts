import { Component } from "@angular/core";
import { AuthenticationLayoutComponent } from "./authentication-layout.component";

@Component({
  selector: 'huafsoft-authentication-register',
  template: `
    <huafsoft-authentication-layout>
      Register page
    </huafsoft-authentication-layout>
  `,
  imports: [AuthenticationLayoutComponent],
  standalone: true,
})
export class RegisterComponent {

}
