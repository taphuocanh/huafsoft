import {Component} from "@angular/core";
import {HeaderComponent} from "@app/admin/partials/header.component";
import {FooterComponent} from "@app/admin/partials/footer.component";

@Component({
  selector: 'huafsoft-admin-layout',
  template: `
    <huafsoft-admin-partials-header></huafsoft-admin-partials-header>
    <ng-content></ng-content>
    <huafsoft-admin-partials-footer></huafsoft-admin-partials-footer>
  `,
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutComponent {

}
