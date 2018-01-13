import { Router } from '@angular/router';
import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

import { LoginService } from './login.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends AppComponentBase {

  valForm: FormGroup;
  @ViewChild('cardBody') cardBody: ElementRef;
  submitting: boolean = false;

  constructor(injector: Injector, public loginService: LoginService, fb: FormBuilder, private router: Router) {
    super(injector);
    loginService.rememberMe = true;
    this.valForm = fb.group({
      userNameOrEmailAddress: [null, Validators.required],//[null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      rememberMe: [null]
    });
  }

  login(): void {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty();
    }
    if (this.valForm.valid) {
      this.submitting = true;
      this.loginService.authenticate(
        () => {
          this.submitting = false;
        }
      );
    }
  }

}
