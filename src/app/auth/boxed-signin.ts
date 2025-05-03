import { Component, inject } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './boxed-signin.html',
    animations: [toggleAnimation],
})
export class BoxedSigninComponent {
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

    loginForm:FormGroup = this._FormBuilder.group({
        username:[''],
        password:['']
    })

    submitLogin():void{
        let data = this.loginForm.value
        // this.router.navigate(['/apps/packages'])
        // localStorage.setItem('token', 'TestToken')

        this._AuthService.login(data).subscribe({
            next:(res)=>{
                localStorage.setItem('token', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)
                localStorage.setItem('fullName', res.data.fullName)
                localStorage.setItem('role', res.data.roles)
                this.router.navigate(['/apps/packages'])
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
