import { Component } from "@angular/core";
import { Routes } from "@angular/router";

@Component({
  selector: 'huafsoft-admin',
  template: `
    <p>Admin area wroks!</p>
  `,
  standalone: true
})
export class AdminComponent {
  constructor() {
    console.log('Admin component construct');

  }
}


// export const routes: Routes = [
//   {
//     path: 'admin',
//     loadComponent: () => import('@app/admin/admin.component').then(c => c.AdminComponent)
//   }
// ];
