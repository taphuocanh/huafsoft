import {Component, inject} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterOutlet,
  RouterStateSnapshot,
  ROUTES,
  Routes,
  Router
} from "@angular/router";
import {AuthenticationService} from "@app/_services";

let AdminAuthGuard: CanActivateFn = function(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  let authenticationService = inject(AuthenticationService);
  let router = inject(Router);
  const user = authenticationService.userValue;
  if (user) {
    // logged in so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
  return false;
}

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('@app/admin/modules/dashboard/dashboard.component').then(c => c.DashboardComponent)
      }
    ],
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('@app/admin/modules/authentication/login.component').then(c => c.LoginComponent)
  }
];

@Component({
  selector: 'huafsoft-admin',
  template: `
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


