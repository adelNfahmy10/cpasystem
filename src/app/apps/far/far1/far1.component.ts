import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { slideDownUp } from 'src/app/shared/animations';
import { IconModule } from 'src/app/shared/icon/icon.module';

@Component({
  selector: 'app-far1',
  standalone: true,
  imports: [IconModule, NgIf, NgClass, RouterLink],
  templateUrl: './far1.component.html',
  styleUrl: './far1.component.css',
  animations: [slideDownUp],
})
export class Far1Component {
    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    constructor() {}

    accordians1:any = 0;
    accordians2:any = 0;
    accordians3:any = 0;
    accordians4:any = 0;
    accordians5:any = 0;

    hideSlide: boolean = false;

    toggle(): void {
      this.hideSlide = !this.hideSlide;
      console.log(this.hideSlide);
    }
    ngOnInit(): void {
        console.log(this.hideSlide);
    }
    modalVisible: boolean = false;

    openModal(): void {
      this.modalVisible = true;
    }

    closeModal(): void {
      this.modalVisible = false;
    }
}
