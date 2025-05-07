import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IconModule } from "../../../shared/icon/icon.module";
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from 'src/app/service/courses/courses.service';
import { PackagesService } from 'src/app/service/packages/packages.service';

@Component({
  selector: 'app-coures',
  standalone: true,
  imports: [IconModule, ReactiveFormsModule],
  templateUrl: './coures.component.html',
  styleUrl: './coures.component.css'
})
export class CouresComponent {
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _CoursesService = inject(CoursesService)
    private readonly _PackagesService = inject(PackagesService)

    allCourses:WritableSignal<any[]> = signal([])
    allPackages:WritableSignal<any[]> = signal([])
    packageId:WritableSignal<any> = signal(null)

    ngOnInit() {
        this.getAllCourses()
        this.getAllPackages()
    }

    getAllPackages():void{
        this._PackagesService.getAllPackages().subscribe({
            next:(res)=>{
                this.allPackages.set(res.data)
            }
        })
    }

    selectPackages(event:Event):void{
        const selectId = (event.target as HTMLSelectElement).value;
        this.packageId.set(selectId)
    }


    getAllCourses():void{
        this._CoursesService.getAllCourses().subscribe({
            next:(res)=>{
                this.allCourses.set(res.data)
            }
        })
    }

    coursesForm:FormGroup = this._FormBuilder.group({
        packageId:[''],
        title:[''],
        subTitle:[''],
        description:[''],
    })

    submitCoursesForm():void{
        let data = this.coursesForm.value
        data.packageId = this.packageId()

        this._CoursesService.createCourses(data).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Course added successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllCourses()
                this.coursesForm.reset()
            }
        })
    }

    deletePackage(id:string):void{
        this._CoursesService.deleteCourses(id).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Course deleted successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllCourses()
            }
        })
    }
}
