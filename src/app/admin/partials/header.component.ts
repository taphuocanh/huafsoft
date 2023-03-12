import {Component} from "@angular/core";
import {HeaderLogoComponent} from "@app/admin/partials/header-logo.component";
import {HeaderNavbarComponent} from "@app/admin/partials/header-navbar.component";
import {HeaderUserBoxComponent} from "@app/admin/partials/header-user-box.component";
import {AuthenticationService} from "@app/_services";
import {User} from "@app/_models";

@Component({
  selector: 'huafsoft-admin-partials-header',
  template: `
    <header>
      <div class="container">
        <div class="row">
          <div class="col">
            <huafsoft-admin-partials-header-logo></huafsoft-admin-partials-header-logo>
          </div>
          <div class="col">
            <huafsoft-admin-partials-header-navbar></huafsoft-admin-partials-header-navbar>
          </div>
          <div class="col ms-auto">
            <huafsoft-admin-partials-header-user-box></huafsoft-admin-partials-header-user-box>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: [
    'header.component.scss'
  ],
  imports: [
    HeaderLogoComponent,
    HeaderNavbarComponent,
    HeaderUserBoxComponent
  ],
  standalone: true
})
export class HeaderComponent {
  public currentUser: User | null = this.authenticationService.userValue;

  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  public get isLogged():boolean {
    let isLogged: boolean = this.authenticationService.isLogged();
    return isLogged;
  }
}
