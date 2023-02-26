import { Component } from '@angular/core';
import { RouterModule, provideRouter, Routes } from '@angular/router';
import { routes as adminRoutes } from '@app/admin/admin.component';
import { AuthGuard } from './_helpers/auth.guard';
@Component({
  selector: 'huafsoft-root',
  template: `
    <p>Hello world!</p>
    <a routerLink="/">Home</a>
    <a routerLink="/admin">Admin</a>
    <a routerLink="/login">Login</a>
    <a routerLink="/register">Register</a>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
  ],
  providers: [
    provideRouter( adminRoutes )
  ],
  standalone: true
})
export class AppComponent {
  title = 'huafsoft';
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
