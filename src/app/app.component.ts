import { inject } from '@angular/core';
import { InitData } from './_helpers/inti-data';
import { Component } from '@angular/core';
import { RouterModule, provideRouter, Routes } from '@angular/router';
// import { routes as adminRoutes } from '@app/admin/admin.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HeaderComponent } from './layouts/header.component';
import { FooterComponent } from './layouts/footer.component';
@Component({
  selector: 'huafsoft-root',
  template: `
    <huafsoft-header [title]="title"></huafsoft-header>
    <router-outlet></router-outlet>
    <huafsoft-footer></huafsoft-footer>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [InitData],
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'huafsoft';
  constructor(private initData: InitData) { }
}
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('@app/admin/admin.component').then(c => c.AdminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('@app/authentication/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('@app/authentication/login.component').then(c => c.LoginComponent)
  },
  { path: '**', redirectTo: '' }
];
