import {Component, OnInit} from "@angular/core";
import {LayoutComponent} from "@app/admin/layout.component";

@Component({
  selector: 'huafsoft-admin-dashboard',
  template: `
    <huafsoft-admin-layout>
    <p>Admin/Dashboard page is working.</p>
    </huafsoft-admin-layout>
  `,
  imports: [
    LayoutComponent
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {

  }
}
