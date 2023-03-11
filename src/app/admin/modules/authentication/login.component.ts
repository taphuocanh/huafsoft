import {Component, OnInit} from "@angular/core";
import {LayoutComponent} from "@app/admin/layout.component";

@Component({
  selector: 'huafsoft-admin-authentication-login',
  template: `
  <huafsoft-admin-layout>
    Login page
  </huafsoft-admin-layout>
  `,
  imports: [
    LayoutComponent
  ],
  standalone: true,
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    console.log('Login page initialized.');
  }

  ngOnDestroy() {
    console.log('Login page destroyed.');
  }
}
