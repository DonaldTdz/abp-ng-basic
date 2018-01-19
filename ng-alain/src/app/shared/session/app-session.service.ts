import { Injectable } from '@angular/core';
import { SessionServiceProxy, UserLoginInfoDto, TenantLoginInfoDto, ApplicationInfoDto, GetCurrentLoginInformationsOutput } from '@shared/service-proxies/service-proxies'
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service'

//alain stting
import { SettingsService } from '@delon/theme';

@Injectable()
export class AppSessionService {

    private _user: UserLoginInfoDto;
    private _tenant: TenantLoginInfoDto;
    private _application: ApplicationInfoDto;

    constructor(
        private _sessionService: SessionServiceProxy,
        private _abpMultiTenancyService: AbpMultiTenancyService,
        private settingService: SettingsService
    ) {
    }

    get application(): ApplicationInfoDto {
        return this._application;
    }

    get user(): UserLoginInfoDto {
        /*this._user = UserLoginInfoDto.fromJS({
            "name":'donald',
            "surname": 'tangdezhou',
            "userName": 'donald',
            "emailAddress": 'tangdezhou@qq.com',
            "id": 1
        });*/
        return this._user;
    }

    get userId(): number {
        return this.user ? this.user.id : null;
    }

    get tenant(): TenantLoginInfoDto {
        return this._tenant;
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    getShownLoginName(): string {
        let userName = this._user.userName;
        if (!this._abpMultiTenancyService.isEnabled) {
            return userName;
        }

        return (this._tenant ? this._tenant.tenancyName : ".") + "\\" + userName;
    }

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._sessionService.getCurrentLoginInformations().toPromise().then((result: GetCurrentLoginInformationsOutput) => {
                this._application = result.application;
                this._user = result.user;
                this._tenant = result.tenant;
                //添加Alain框架设置user
                if (this._user) {
                    let user = { name: this._user.name, email: this._user.emailAddress };
                    this.settingService.setUser(user);//目前abp setting和 alain setting还未整合到一起，先兼容 保留两个一起使用
                }
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }

    changeTenantIfNeeded(tenantId?: number): boolean {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }

        abp.multiTenancy.setTenantIdCookie(tenantId);
        location.reload();
        return true;
    }

    private isCurrentTenant(tenantId?: number) {
        if (!tenantId && this.tenant) {
            return false;
        } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }

        return true;
    }
}