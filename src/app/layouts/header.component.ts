import { Component, Input } from "@angular/core";
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'huafsoft-header',
    template: `
        <header>
            <div class="container">
                <div class="top-logo-wrapper">
                    <a href="">
                        <h3>{{title}}</h3>
                    </a>
                </div>
                <div class="top-navbar-wrapper">
                    <ul class="navbar">
                        <li *ngFor="let item of navItems" >
                            <a routerLink="{{item.link}}" routerLinkActive="active">
                                {{ item.label }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>  
    `,
    standalone: true,
    imports: [
        RouterModule,
        NgFor
    ]
})
export class HeaderComponent {
    @Input() public title:string = '';
    protected readonly navItems: {
        label: string,
        name: string,
        link: string
    }[] = [
        {
            label: 'Home',
            name: 'home',
            link: '/'
        },
        {
            label: 'Login',
            name: 'login',
            link: '/login'
        },
        {
            label: 'Register',
            name: 'register',
            link: '/register'
        }
    ]
}