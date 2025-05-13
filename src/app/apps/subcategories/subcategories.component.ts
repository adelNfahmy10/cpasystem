import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubcategoriesService } from 'src/app/service/subcategories/subcategories.service';
import { slideDownUp } from 'src/app/shared/animations';
import { IconModule } from 'src/app/shared/icon/icon.module';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';


@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [IconModule, NgIf, NgClass],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
  animations: [slideDownUp],
})
export class SubcategoriesComponent implements OnInit{
    private readonly _SubcategoriesService = inject(SubcategoriesService)
    private readonly _ActivatedRoute = inject(ActivatedRoute)
    private readonly _Router = inject(Router)

    allSubCategories:WritableSignal<any[]> = signal([])
    countQuestions:WritableSignal<any> = signal({})
    allQuestionTypes:WritableSignal<any[]> = signal([])
    accordians:any = 0;

    ngOnInit(): void {
        this.getAllSubCategories()
    }

    getAllSubCategories():void{
        this._ActivatedRoute.paramMap.subscribe({
            next:(params) => {
                let categoryId = params.get('id')
                this._SubcategoriesService.getSubCategoriesByCategoryId(categoryId).subscribe({
                    next:(res)=>{
                        this.allSubCategories.set(res.data.subCategories)
                    }
                })
            }
        })
    }

    modalVisible: boolean = false;
    openModal(): void {
      this.modalVisible = true;
    }
    closeModal(): void {
      this.modalVisible = false;
    }

    questionRouting(subCategoryId:any, questionType:any):void{
        if(questionType == 1){
            this._Router.navigate(['/mcq/' + subCategoryId + '/' + questionType])
        } else if(questionType == 2){
            this._Router.navigate(['/tbs/' + subCategoryId + '/' + questionType])
        }
    }
}
