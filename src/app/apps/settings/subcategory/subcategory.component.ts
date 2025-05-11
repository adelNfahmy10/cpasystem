import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IconModule } from "../../../shared/icon/icon.module";
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from 'src/app/service/courses/courses.service';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { SubcategoriesService } from 'src/app/service/subcategories/subcategories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [IconModule, ReactiveFormsModule, NgFor],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent {
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _CategoriesService = inject(CategoriesService)
    private readonly _SubcategoriesService = inject(SubcategoriesService)

    allSubCategories:WritableSignal<any[]> = signal([])
    allCategories:WritableSignal<any[]> = signal([])
    categoryId:WritableSignal<any> = signal(null)

    ngOnInit() {
        this.getAllSubCategories()
        this.getAllCategories()
        this.addQuestionType()
    }

    getAllCategories():void{
        this._CategoriesService.getAllCategories().subscribe({
            next:(res)=>{
                this.allCategories.set(res.data)
            }
        })
    }

    selectCategory(event:Event):void{
        const selectId = (event.target as HTMLSelectElement).value;
        this.categoryId.set(selectId)
    }

    getAllSubCategories():void{
        this._SubcategoriesService.getAllSubCategories().subscribe({
            next:(res)=>{
                this.allSubCategories.set(res.data)
                console.log(res);
            }
        })
    }

    subCategoryForm:FormGroup = this._FormBuilder.group({
        categoryId:[''],
        title:[''],
        description:[''],
        subCategoryQuestionTypes:this._FormBuilder.array([]),
    })

    questionTypeArray():FormArray{
        return this.subCategoryForm.get('subCategoryQuestionTypes') as FormArray
    }

    addQuestionType(){
        let questionType = this._FormBuilder.group({
            questionTypeId:['Choose A Question Type'],
            estimateTime:[''],
        })

        this.questionTypeArray().push(questionType)
    }

    removeQuestionType(index:number){
        return this.questionTypeArray().removeAt(index)
    }

    submitSubCategories():void{
        let data = this.subCategoryForm.value
        data.categoryId = this.categoryId()

        this._SubcategoriesService.createSubCategories(data).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'SubCategory added successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllSubCategories()
                this.subCategoryForm.reset()
            }
        })
    }

    deleteSubCategory(id:string):void{
        this._SubcategoriesService.deleteSubCategories(id).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Category deleted successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllSubCategories()
            }
        })
    }
}
