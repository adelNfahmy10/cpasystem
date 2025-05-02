import { Component, inject } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './boxed-signup.html',
    animations: [toggleAnimation],
})
export class BoxedSignupComponent {
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _AuthService = inject(AuthService)

    store: any;
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
    ) {
        this.initStore();
    }

    registerForm:FormGroup = this._FormBuilder.group({
        fullName:['', [Validators.required]],
        mobile:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required]],
    })

    submitRegisterForm():void{
        let data = this.registerForm.value
        this._AuthService.register(data).subscribe({
            next:(res)=>{
                 Swal.fire({
                    icon: 'success',
                    title: 'Good job',
                    text: 'Your account has been created successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.router.navigate(['/auth/boxed-signin'])
            }
        })
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }
}
