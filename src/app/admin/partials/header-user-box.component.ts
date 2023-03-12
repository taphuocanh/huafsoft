import {Component, ElementRef, HostListener} from "@angular/core";
import {User} from "@app/_models";
import {AuthenticationService} from "@app/_services";
import {NgClass} from "@angular/common";

@Component({
  selector: 'huafsoft-admin-partials-header-user-box',
  template: `
    <button (click)="isShow = !isShow">
      <span>{{currentUser!.username}}</span>
    </button>
    <ul class="navbar user-navbar" [ngClass]="{show: isShow}">
      <li class="nav-item">
        <a href="#" [ngClass]="{'nav-link': true}" (click)="logout()">Đăng xuất</a>
      </li>
    </ul>
  `,
  styleUrls: [
    'header-user-box.component.scss'
  ],
  imports: [
    NgClass
  ],
  standalone: true
})
export class HeaderUserBoxComponent {
  isShow: boolean = false;
  public currentUser: User | null = this.authenticationService.userValue;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly elementRef: ElementRef
  ) {}

  @HostListener('click')
  userMenuToggle() {

  }

  logout() {
    this.authenticationService.logout();
  }
}
