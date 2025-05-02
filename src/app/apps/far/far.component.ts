import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    constructor() {}

    accordians1:any = 1;
    accordians2:any = 1;
    accordians3:any = 1;
    accordians4:any = 1;
}
