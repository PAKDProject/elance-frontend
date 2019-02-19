import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { CognitoWebTokenAuthService } from 'src/services/cognito-auth/cognito-web-token-auth.service';
import { NotificationService } from 'src/services/notifications/notification.service';
import { UserService } from 'src/services/user-service/user.service';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { UserProfileModalComponent } from 'src/app/modals/user-profile-modal/user-profile-modal.component';

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
    { path: 'messages', title: 'Messages', icon: 'message', class: '' },
    { path: 'organization-dashboard', title: 'Organization Dashboard', icon: 'group', class: '' },
    { path: 'user-profile', title: 'My Profile', icon: 'face', class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
    @Select(UserState.getUser) user$: Observable<IUser>
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    menuItems: any[];
    userFName: string;
    search: string;
    avatar: string;
    results: IUser[] = [];

    constructor(
        private _auth: CognitoWebTokenAuthService,
        private _notifier: NotificationService,
        private _userService: UserService,
        public _viewProfileDialog: MatDialog
    ) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.user$.subscribe(res => {
            this.userFName = res.fName;
            this.avatar = res.avatarUrl;
        })


    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    logOut() {
        this._auth.logout().subscribe(res => {
            this._notifier.showInfo("Bye " + this.userFName);
            window.location.href = "http://login.elance.site"
        }, err => {
            this._notifier.showError("Failed to logout!")
        })
    }

    showResults(searchTerm: string) {
        this.results = [];
        this._userService.searchUsers(searchTerm).subscribe((data) => {
            data.users.forEach((u: { _source: IUser; }) => {
                this.results.push(u._source);
            });
            this.trigger.openMenu();
        });
    }

    viewProfile(user: IUser) {
        this._viewProfileDialog.open(UserProfileModalComponent, {
            data: user
        });
    }
}