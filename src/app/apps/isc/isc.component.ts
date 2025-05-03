import { Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { CoursesService } from 'src/app/service/courses/courses.service';
import { IconModule } from 'src/app/shared/icon/icon.module';
@Component({
  selector: 'app-isc',
  standalone: true,
  imports: [IconModule],
  templateUrl: './isc.component.html',
  styleUrl: './isc.component.css'
})
export class IscComponent{
    private readonly _CoursesService = inject(CoursesService)
    private readonly _CategoriesService = inject(CategoriesService)

    courseId:Signal<string | null> = computed( () => this._CoursesService.courseId())
    allCategories:WritableSignal<any[]> = signal([])

    constructor() {
        effect(() => {
          const id = this.courseId();
          if (id) {
            this._CategoriesService.getCategoriesByCouresId(id).subscribe({
              next: (res) => {
                this.allCategories.set(res.data);
                console.log(this.allCategories());
              }
            });
          }
        });
    }
}
