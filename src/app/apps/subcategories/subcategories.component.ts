import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  imports: [IconModule, NgIf, NgClass, RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css',
  animations: [slideDownUp],
})
export class SubcategoriesComponent implements OnInit{
    private readonly _SubcategoriesService = inject(SubcategoriesService)
    private readonly _ActivatedRoute = inject(ActivatedRoute)

    allSubCategories:WritableSignal<any[]> = signal([])
    allQuestionTypes:WritableSignal<any[]> = signal([])

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
                        this.allQuestionTypes.set(res.data.questionTypes)
                    }
                })
            }
        })
    }


    accordians:any = 0;

    modalVisible: boolean = false;
    openModal(): void {
      this.modalVisible = true;
    }
    closeModal(): void {
      this.modalVisible = false;
    }
}
