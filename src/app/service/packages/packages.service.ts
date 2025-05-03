import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
    private readonly _HttpClient = inject(HttpClient)

    getAllPackages():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Package/GetAllPackages`)
    }

    getPackageById(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Package/GetPackageById/${id}`)
    }

    createPackages(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}Package/CreatePackage`, data)
    }

    deletePackages(id:any):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}Package/DeletePackage/${id}`)
    }

    updatePackages(id:any, data:any):Observable<any>{
        return this._HttpClient.put(`${environment.baseUrl}Package/UpdatePackage/${id}`, data)
    }
}
