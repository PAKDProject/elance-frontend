import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'user-dashboard', title: 'User Dashboard', icon: 'dashboard', class: '' },
    { path: 'browse-jobs', title: 'Browse Jobs', icon: 'find_in_page', class: '' },
    { path: 'messages', title: 'Messaging', icon: 'message', class: '' },
    { path: 'organization-dashboard', title: 'Organization Dashboard', icon: 'group', class: '' },
    { path: 'user-profile', title: 'My Profile', icon: 'face', class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}