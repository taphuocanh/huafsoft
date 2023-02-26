import { Component } from "@angular/core";

@Component({
  selector: 'huafsoft-authentication-layout',
  template: `
    <p>top layout</p>
    <ng-content></ng-content>
    <p>bottom layout</p>
  `,
  standalone: true
})
export class AuthenticationLayoutComponent {}
