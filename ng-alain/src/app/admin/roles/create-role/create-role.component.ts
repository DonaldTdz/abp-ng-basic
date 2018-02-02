import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
//import { ModalDirective } from 'ngx-bootstrap';
import { RoleServiceProxy, CreateRoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

//import * as _ from "lodash";

@Component({
    selector: 'create-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;

    permissions: ListResultDtoOfPermissionDto = null;
    role: CreateRoleDto = null;

    form: FormGroup;
    roles: any = [];

    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAllPermissions()
            .subscribe((permissions: ListResultDtoOfPermissionDto) => {
                this.permissions = permissions;
                this.permissions.items.forEach(element => {
                    element.checked = true;
                });
            });

        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
            displayName: [null, Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
            description: [null],
            permissiongroup: [null]
        }, );
    }

    show(): void {
        this.role = new CreateRoleDto();
        this.role.init({ isStatic: false });
        this.modalVisible = true;
    }

    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            var permissions = [];

            this.permissions.items.forEach((permission) => {
                if (permission.checked) {
                    permissions.push(permission.name);
                }
            });

            this.role.permissions = permissions;
            this.isConfirmLoading = true;
            this._roleService.create(this.role)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.modalVisible = false;
        //this.modal.hide();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }


    getFormControl(name: string) {
        return this.form.controls[name];
    }

    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }

}
