import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuestionsService } from 'src/app/service/questions/questions.service';
import { IconModule } from 'src/app/shared/icon/icon.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [IconModule, RouterLink],
  templateUrl: './question-details.component.html',
  styleUrl: './question-details.component.css'
})
export class QuestionDetailsComponent {
    private readonly _QuestionsService = inject(QuestionsService)
    private readonly _ActivatedRoute = inject(ActivatedRoute)
    private readonly _Router = inject(Router)

    questionDetails:WritableSignal<any> = signal({})
    questionId:WritableSignal<any> = signal(null)

    ngOnInit() {
        this.getquestionDetails()
    }

    getquestionDetails():void{
        this._ActivatedRoute.paramMap.subscribe({
            next:(param)=>{
                this.questionId.set(param.get('id'))
                this._QuestionsService.getQuestionById(this.questionId()).subscribe({
                    next:(res)=>{
                        this.questionDetails.set(res.data)
                        console.log(this.questionDetails());
                    }
                })
            }
        })
    }

    deleteQuestion(id:string):void{
    this._QuestionsService.deleteQuestion(id).subscribe({
        next:(res)=>{
            Swal.fire({
                icon: 'success',
                title: 'Question deleted successfully',
                customClass: { popup: 'sweet-alerts' },
            });
            this._Router.navigate(['/apps/settings/Questions'])
        }
    })
}
}
