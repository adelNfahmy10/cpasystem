import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { IconModule } from 'src/app/shared/icon/icon.module';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IconModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
    private readonly _CategoriesService = inject(CategoriesService)
    private readonly _ActivatedRoute = inject(ActivatedRoute)

    allCategories:WritableSignal<any[]> = signal([])
    courseId:WritableSignal<string> = signal('')

    ngOnInit(): void {
        this.getAllCategoriesByCourseId()
    }

    getAllCategoriesByCourseId():void{
        this._ActivatedRoute.paramMap.subscribe({
            next:(param)=>{
                this.courseId.set(param.get('id')!)
                this._CategoriesService.getCategoriesByCouresId(this.courseId()).subscribe({
                    next:(res)=>{
                        this.allCategories.set(res.data)
                    }
                })
            }
        })
    }
}
