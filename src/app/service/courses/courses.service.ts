import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
    private readonly _HttpClient = inject(HttpClient)

    courseId:WritableSignal<string | null> = signal(null)

    getAllCourses():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Courses/GetAllCources`)
    }

    getCourseById(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Courses/GetCourseById/${id}`)
    }

    createCourses(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}Courses/CreateCourse`, data)
    }

    deleteCourses(id:any):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}Courses/DeleteCourse?id=${id}`)
    }

    updateCourses(id:any, data:any):Observable<any>{
        return this._HttpClient.put(`${environment.baseUrl}Courses/UpdateCourse/${id}`, data)
    }
}
