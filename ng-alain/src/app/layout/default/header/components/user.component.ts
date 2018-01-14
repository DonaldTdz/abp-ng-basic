import { Component, OnInit, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
//abp集成 2018-1-14
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
            {{settings.user.name}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisable]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [nzDisable]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent extends AppComponentBase implements OnInit  {
    constructor(injector: Injector, 
        public settings: SettingsService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private _authService: AppAuthService) {
            super(injector);
        }

    ngOnInit(): void {
        /*this.tokenService.change().subscribe((res: any) => {
            this.settings.setUser(res);
        });
        // mock
        const token = this.tokenService.get() || {
            token: 'nothing',
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com'
        };
        this.tokenService.set(token);*/
    }

    logout() {
        //this.tokenService.clear();
        //this.router.navigateByUrl(this.tokenService.login_url);
        this._authService.logout();
    }
}
