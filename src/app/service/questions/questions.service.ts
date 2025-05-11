import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
    private readonly _HttpClient = inject(HttpClient)

    getAllQuesitons():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Question/GetAllQuestion`)
    }

    getQuestionById(id:any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Question/GetQuestionById/${id}`)
    }

    getQuestionTypeId(subcategoryId :any, questionTypeId :any):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}Question/GetQuestionBySubcategoryId/${subcategoryId}/QuestionTypeId/${questionTypeId}`)
    }

    createQuestion(data:any):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}Question/CreateQuestion`, data)
    }

    deleteQuestion(id:any):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}Question/DeleteQuestion/${id}`)
    }

    updateQuestion(id:any, data:any):Observable<any>{
        return this._HttpClient.put(`${environment.baseUrl}Question/UpdateQuestion/${id}`, data)
    }
}
