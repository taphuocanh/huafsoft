import { Component } from "@angular/core";
import {RouterOutlet, ROUTES, Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@app/admin/modules/authentication/login.component').then(c => c.LoginComponent)
  }
];

@Component({
  selector: 'huafsoft-admin',
  template: `
    <p><small>Khu vực quản trị viên</small></p>
    <router-outlet></router-outlet>
  `,
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AdminComponent {
  constructor() {
    console.log('Admin component construct');

  }
}


