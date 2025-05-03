import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { CoursesService } from 'src/app/service/courses/courses.service';
import { slideDownUp } from 'src/app/shared/animations';
import { IconModule } from 'src/app/shared/icon/icon.module';

@Component({
  selector: 'app-far',
  standalone: true,
  imports: [IconModule , RouterLink],
  templateUrl: './far.component.html',
  styleUrl: './far.component.css',
  animations: [slideDownUp],
})
export class FarComponent {
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

    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    accordians1:any = 1;
    accordians2:any = 1;
    accordians3:any = 1;
    accordians4:any = 1;
}
