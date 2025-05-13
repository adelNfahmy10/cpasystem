import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IconModule } from "../../../shared/icon/icon.module";
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubcategoriesService } from 'src/app/service/subcategories/subcategories.service';
import { NgFor } from '@angular/common';
import { QuestionsService } from 'src/app/service/questions/questions.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [IconModule, ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
 private readonly _FormBuilder = inject(FormBuilder)
    private readonly _SubcategoriesService = inject(SubcategoriesService)
    private readonly _QuestionsService = inject(QuestionsService)

    allSubCategories:WritableSignal<any[]> = signal([])
    allQuestions:WritableSignal<any[]> = signal([])
    subCategoryId:WritableSignal<any> = signal(null)
    questionTypeId:WritableSignal<any> = signal(null)

    ngOnInit() {
        this.getAllSubCategories()
        this.getAllQuestions()
        this.addMsqOption()
    }

    selectQuestionType(event:Event):void{
        const selectId = (event.target as HTMLSelectElement).value;
        this.questionTypeId.set(selectId)
    }

    selectSubCategory(event:Event):void{
        const selectId = (event.target as HTMLSelectElement).value;
        this.subCategoryId.set(selectId)
    }

    getAllSubCategories():void{
        this._SubcategoriesService.getAllSubCategories().subscribe({
            next:(res)=>{
                this.allSubCategories.set(res.data)
                console.log(res);
            }
        })
    }

    getAllQuestions():void{
        this._QuestionsService.getAllQuesitons().subscribe({
            next:(res)=>{
                this.allQuestions.set(res.data)
            }
        })
    }

    questionForm:FormGroup = this._FormBuilder.group({
        subCategoryId:[''],
        typeId:[''],
        questionText:[''],
        description:[''],
        difficulty:[''],
        explanation:[''],
        hasTable:[true],
        mcqOptions:this._FormBuilder.array([]),
        tableRows:this._FormBuilder.array([]),
    })

    msqOptionArray():FormArray{
        return this.questionForm.get('mcqOptions') as FormArray
    }

    addMsqOption(){
        let option = this._FormBuilder.group({
            optionText:[''],
            isCorrect:[false],
        })

        this.msqOptionArray().push(option)
    }

    removeMsqOption(index:number){
        return this.msqOptionArray().removeAt(index)
    }

    submitQuestionForm():void{
        let data = this.questionForm.value
        data.subCategoryId = this.subCategoryId()
        data.typeId = this.questionTypeId()

        this._QuestionsService.createQuestion(data).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Question added successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllQuestions()
                this.questionForm.reset()
                this.msqOptionArray().clear()
                this.addMsqOption()
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
                this.getAllQuestions()
            }
        })
    }
}
