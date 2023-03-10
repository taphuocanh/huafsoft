import { Component } from "@angular/core";

@Component({
  selector: 'huafsoft-authentication-layout',
  template: `
    <div class="container">
      <div class="row">
        <ng-content></ng-content>
      </div>
    </div>

  `,
  styleUrls: [
    './authentication-layout.component.scss'
  ],
  standalone: true
})
export class AuthenticationLayoutComponent { }
