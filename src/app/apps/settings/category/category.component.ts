import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IconModule } from "../../../shared/icon/icon.module";
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from 'src/app/service/courses/courses.service';
import { PackagesService } from 'src/app/service/packages/packages.service';
import { CategoriesService } from 'src/app/service/categories/categories.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IconModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
 private readonly _FormBuilder = inject(FormBuilder)
    private readonly _CategoriesService = inject(CategoriesService)
    private readonly _CoursesService = inject(CoursesService)

    allCategories:WritableSignal<any[]> = signal([])
    allCourses:WritableSignal<any[]> = signal([])
    courseId:WritableSignal<any> = signal(null)

    ngOnInit() {
        this.getAllCategories()
        this.getAllCourses()
    }

    getAllCourses():void{
        this._CoursesService.getAllCourses().subscribe({
            next:(res)=>{
                this.allCourses.set(res.data)
            }
        })
    }

    selectCourse(event:Event):void{
        const selectId = (event.target as HTMLSelectElement).value;
        this.courseId.set(selectId)
    }

    getAllCategories():void{
        this._CategoriesService.getAllCategories().subscribe({
            next:(res)=>{
                this.allCategories.set(res.data)
            }
        })
    }

    categoryForm:FormGroup = this._FormBuilder.group({
        courseId:[''],
        title:[''],
        subTitle:[''],
        description:[''],
    })

    submitCategories():void{
        let data = this.categoryForm.value
        data.courseId = this.courseId()

        this._CategoriesService.createCategories(data).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Category added successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllCategories()
                this.categoryForm.reset()
            }
        })
    }

    deletePackage(id:string):void{
        this._CategoriesService.deleteCategories(id).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Category deleted successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllCategories()
            }
        })
    }
}
