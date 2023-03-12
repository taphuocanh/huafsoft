import { Component } from '@angular/core';
import {provideRouter, provideRoutes, RouterModule, ROUTES, Routes} from '@angular/router';
import { routes as adminRoutes } from '@app/admin/admin.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HeaderComponent } from './layouts/header.component';
import { FooterComponent } from './layouts/footer.component';
@Component({
  selector: 'huafsoft-root',
  template: `
<!--    <huafsoft-header [title]="title"></huafsoft-header>-->
    <router-outlet></router-outlet>
    <huafsoft-footer></huafsoft-footer>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'huafsoft';
  constructor() { }
}
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@app/pages').then(c => c.PageHomeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('@app/admin/admin.component').then(c => c.AdminComponent),
    loadChildren: () => import('@app/admin/admin.component').then(c => c.routes)
  },
  {
    path: 'register',
    loadComponent: () => import('@app/authentication/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('@app/authentication/login.component').then(c => c.LoginComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];
