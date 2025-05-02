import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mcq',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './mcq.component.html',
  styleUrl: './mcq.component.css'
})
export class McqComponent {
    openExternalCalculator() {
        window.open('https://www.online-calculator.com/full-screen-calculator/', '_blank', 'width=400,height=600');
    }

    questionsIndex:any[] = Array(36)

    qurestions:any[] = [
        {question: "A company's year-end comparative statement of financial position reflects the following changes from the prior year: cash increased by $40,000, total liabilities increased by $32,000, and all other assets decreased by $65,000. Which of the following statements is correct regarding the current-year change in the company's stockholders' equity?",
            options: [
                {option: 'It increased by $25,000.', answed: false},
                {option: 'It increased by $105,000.', answed: false},
                {option: 'It decreased by $32,000.', answed: true},
                {option: 'It decreased by $57,000.', answed: false},
            ],
        },
        {question: "A company's year-end comparative statement of financial position reflects the following changes from the prior year: cash increased by $40,000, total liabilities increased by $32,000, and all other assets decreased by $65,000. Which of the following statements is correct regarding the current-year change in the company's stockholders' equity?",
            options: [
                {option: 'It increased by $25,000.', answed: false},
                {option: 'It increased by $105,000.', answed: false},
                {option: 'It decreased by $32,000.', answed: true},
                {option: 'It decreased by $57,000.', answed: false},
            ],
        },
        {question: "A company's year-end comparative statement of financial position reflects the following changes from the prior year: cash increased by $40,000, total liabilities increased by $32,000, and all other assets decreased by $65,000. Which of the following statements is correct regarding the current-year change in the company's stockholders' equity?",
            options: [
                {option: 'It increased by $25,000.', answed: false},
                {option: 'It increased by $105,000.', answed: false},
                {option: 'It decreased by $32,000.', answed: true},
                {option: 'It decreased by $57,000.', answed: false},
            ],
        }
    ]

    correctAnswer:boolean = true
}
