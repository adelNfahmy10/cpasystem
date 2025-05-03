import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private readonly _HttpClient = inject(HttpClient)

    getAllCategories():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Category/GetAllCategories`)
    }

    getCategoryById(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Category/GetCategoryById/${id}`)
    }
    getCategoriesByCouresId(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Category/GetCategoriesByCourseId/${id}`)
    }

    createCategories(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}Category/CreateCategory`, data)
    }

    deleteCategories(id:any):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}Category/DeleteCategory/${id}`)
    }

    updateCategories(id:any, data:any):Observable<any>{
        return this._HttpClient.put(`${environment.baseUrl}Category/UpdateCategory/${id}`, data)
    }
}
