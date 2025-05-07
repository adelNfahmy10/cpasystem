import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
    private readonly _HttpClient = inject(HttpClient)

    getAllSubCategories():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}SubCategory/GetAllSubCategory`)
    }

    getSubCategoryById(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}SubCategory/GetSubCategoryById/${id}`)
    }
    getSubCategoriesByCategoryId(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}SubCategory/subcategory/category/${id}`)
    }

    createSubCategories(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}SubCategory/CreateSubCategory`, data)
    }

    deleteSubCategories(id:any):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}SubCategory/DeleteSubCategory/${id}`)
    }

    updateSubCategories(id:any, data:any):Observable<any>{
        return this._HttpClient.put(`${environment.baseUrl}SubCategory/UpdateSubCategory/${id}`, data)
    }
}
