import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly _HttpClient = inject(HttpClient)


    register(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}UserManager/v1/Register/register`, data)
    }
    login(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}Auth/v1/Login/login`, data)
    }
}
