import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';
import { CoursesService } from '../service/courses/courses.service';
import { CategoriesService } from '../service/categories/categories.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    private readonly _CoursesService = inject(CoursesService)

    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    allCourses:any[] = []
    allCategoriesByCourseId: any[] = []

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
    ) {
        this.initStore();
    }

    ngOnInit() {
        this.setActiveDropdown();
        this.getAllCourses()
    }

    getAllCourses():void{
        this._CoursesService.getAllCourses().subscribe({
            next:(res)=>{
                this.allCourses = res.data
            }
        })
    }


    getAllCategoriesByCourseId(id:string):void{
        this._CoursesService.courseId.set(id)
        console.log(this._CoursesService.courseId());

        // this._CoursesService.getCourseById(id).subscribe({
        //     next:(res)=>{
        //         this.allCategoriesByCourseId = res.data.categories
        //         console.log(this.allCategoriesByCourseId);
        //     }
        // })
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }
}
