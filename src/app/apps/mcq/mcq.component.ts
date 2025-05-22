import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { QuestionsService } from 'src/app/service/questions/questions.service';

@Component({
  selector: 'app-mcq',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, NgxTippyModule, RouterLink],
  templateUrl: './mcq.component.html',
  styleUrl: './mcq.component.css'
})
export class McqComponent implements OnInit{
    private readonly _ActivatedRoute = inject(ActivatedRoute)
    private readonly _QuestionsService = inject(QuestionsService)
    private readonly _Router = inject(Router)

    allQuestions:WritableSignal<any[]> = signal([])
    headTitle:WritableSignal<any> = signal({})
    userId:WritableSignal<string | null> = signal(localStorage.getItem('userId') || null)
    categoryId:WritableSignal<string> = signal('')
    subCategoryId:WritableSignal<string> = signal('')
    questionTypeId:WritableSignal<string> = signal('')
    selectedOption: any = null;
    selectedOptionId: number | null = null;
    seconds: number = 0;
    minutes: number = 0;
    timerInterval: any;
    timerRunning: boolean = false;
    questions:any[] = []
    answerQuestions:any[] = []
    answerReport: any = {};
    modalVisible: boolean = false;

    ngOnInit(): void {
        this.startTimer()
        this.getAllQuestions()
    }

    getAllQuestions():void{
        this._ActivatedRoute.paramMap.subscribe({
            next:(params)=>{
                this.subCategoryId.set(params.get('subCategoryId')!)
                this.questionTypeId.set(params.get('typeId')!)
                this._QuestionsService.getQuestionByTypeId(this.subCategoryId(), this.questionTypeId()).subscribe({
                    next:(res)=>{
                        this.questions = res.data[0].questions
                        this.headTitle.set(res.data[0].details)
                        this.categoryId.set(this.headTitle().categoryId)
                        console.log(this.questions);

                    }
                })
            }
        })
    }

    // questions:any[] = [
    //     {
    //         id: 1,
    //         msqID:'MCQ-05427-' + 1,
    //         question: "Envoy Co. manufactures and sells household products. Envoy experienced losses associated with its small appliance group. Operations and cash flows for this group can be clearly distinguished from the rest of Envoy's operations. Envoy plans to sell the small appliance group with its operations. What is the earliest point at which Envoy should report the small appliance group as a discontinued operation?",
    //         options: [
    //             {id: 1, option: 'A. When Envoy sells the majority of the assets of the segment.', answer: false},
    //             {id: 2, option: 'B. When Envoy classifies it as held for sale.', answer: true},
    //             {id: 3, option: 'C. When Envoy receives an offer for the segment.', answer: false},
    //             {id: 4, option: 'D. When Envoy first sells any of the assets of the segment.', answer: false},
    //         ],
    //         explanation:{
    //             desc: 'Choice "B" is correct. The earliest period that a component of an entity can be reported in discontinued operations is when the component meets the following "held for sale" criteria:',
    //             choices: [
    //                 '1. Management commits to a plan to sell the component.',
    //                 '2. The component is available for immediate sale in its present condition.',
    //                 '3. An active program to locate a buyer has been initiated.',
    //                 '4. The sale of the component is probable and the sale is expected to be completed within one year.',
    //                 '5. The sale of the component is being actively marketed.',
    //                 '6. It is unlikely that significant change to the plan to sell will be made or that the plan will be withdrawn.',
    //                 '"C", "D", and "A" are incorrect, per the explanation above.'
    //             ],

    //         }
    //     },
    //     {
    //         id:2,
    //         msqID:'MCQ-01274-' + 2,
    //         question: "On September 22, Year 4, Yumi Corp. purchased merchandise from an unaffiliated foreign company for 10,000 units of the foreign company's local currency. On that date, the spot rate was $0.55. Yumi paid the bill in full on March 20, Year 5, when the spot rate was $0.65. The spot rate was $0.70 on December 31, Year 4. What amount should Yumi report as a foreign currency transaction loss in its income statement for the year ended December 31, Year 4?",
    //         options: [
    //             {id: 1,option: 'A. $1,000.', answer: false},
    //             {id: 2,option: 'B. $500.', answer: false},
    //             {id: 3,option: 'C. $0.', answer: false},
    //             {id: 4,option: 'D. $1,500.', answer: true},
    //         ],
    //         explanation:{
    //             desc: 'Choice "D" is correct. On September 22, the liability denominated in dollars equals $5,500 (10,000 units x $0.55 spot rate). On December 31, the liability denominated in dollars equals $7,000 (10,000 units x $0.70 spot rate). At year-end, the foreign currency transaction loss equals $1,500 ($7,000 − $5,500).',
    //             choices: [
    //                 'Choice "A" is incorrect. Only the loss as of December 31 should be recognized.',
    //                 'Choice "B" is incorrect. Only the loss as of December 31 should be recognized.',
    //                 'Choice "C" is incorrect. Because the spot rate at year-end is different from the spot rate at September 22, a foreign currency transaction gain or loss must be recognized.',
    //             ],
    //         }
    //     },
    //     {
    //         id:3,
    //         msqID:'MCQ-08883-' + 3,
    //         question: "A company's year-end comparative statement of financial position reflects the following changes from the prior year: cash increased by $40,000, total liabilities increased by $32,000, and all other assets decreased by $65,000. Which of the following statements is correct regarding the current-year change in the company's stockholders' equity? ",
    //         options: [
    //             {id: 1,option: 'A. It decreased by $57,000.', answer: true},
    //             {id: 2,option: 'B. It increased by $25,000.', answer: false},
    //             {id: 3,option: 'C. It increased by $105,000.', answer: false},
    //             {id: 4,option: 'D. It decreased by $32,000.', answer: false},
    //         ],
    //         explanation:{
    //             desc: `Choice "A" is correct. Assets = Liabilities + Stockholders' equity. If cash increased by $40,000 and other assets decreased by $65,000, the net change in assets is a decline of $25,000. Liabilities increased $32,000. Setting up the equation to reflect the changes in each category, −$25,000 = $32,000 + SE. SE = −$57,000.`,
    //             choices: [
    //                 '`Choice "B" is incorrect. Stockholders` equity could not have increased if assets decreased and liabilities increased.',
    //                 'Choice "B" is incorrect. Only the loss as of December 31 should be recognized.',
    //                 'Choice "C" is incorrect. Because the spot rate at year-end is different from the spot rate.',
    //                 'Choice "C" is incorrect. Because the spot rate at year-end is different from the spot rate at September 22, a foreign currency transaction gain or loss must be recognized.',
    //             ],

    //         }
    //     },
    //     {
    //         id:4,
    //         msqID:'MCQ-06565-' + 4,
    //         question: `"In Dart Co.'s Year 2 single-step income statement, as prepared by Dart's controller, the section titled 'Revenues' consisted of the following:" In its Year 2 single-step income statement, what amount should Dart report as total revenues?`,

    //         options: [
    //             {id: 1,option: 'A. $250,000', answer: true},
    //             {id: 2,option: 'B. $253,000', answer: false},
    //             {id: 3,option: 'C. $263,000', answer: false},
    //             {id: 4,option: 'D. $260,000', answer: false},
    //         ],
    //         explanation:{
    //             desc: `Choice "A" is correct. The single-step income statement will include in total revenues all sales of goods, services, and rentals. Purchase discounts are not included in revenue, but instead reduce cost of goods sold. The recovery of accounts written off does not hit the revenue account.`,
    //             choices: [
    //                 'Choice "B" is incorrect. Sales are appropriately included, but purchase discounts are not.',
    //                 'Choice "C" is incorrect. Purchase discounts are not included in revenue and the recovery of accounts written off does not hit the revenue account.',
    //                 'Choice "D" is incorrect. Revenues are not impacted by the recovery of accounts written off. When accounts written off are recovered, the first entry is to debit accounts receivable and credit the allowance for doubtful accounts. Then, to record the collection of the cash, the debit is to cash and the credit is to accounts receivable.',
    //             ],

    //         }
    //     },
    // ]

    // selectQuestion(id: number) {
    //     this.selectedQuestionId = id;
    //     this.selectedOption = null;
    //     this.resetTimer();
    // }

    // selectOption(option: any) {
    //     this.selectedOption = option;
    //     this.selectedOptionId = option.id;
    //     console.log('Selected Question ID:', this.selectedQuestionId);
    //     console.log('Selected Option ID:', this.selectedOptionId);
    // }

    startTimer() {
        if (this.timerRunning) return;
        this.timerRunning = true;

        this.timerInterval = setInterval(() => {
          this.seconds++;

          if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
          }
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
        this.timerRunning = false;
    }

    toggleTimer() {
        if (this.timerRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.seconds = 0;
        this.minutes = 0;
        this.timerRunning = false;
        this.startTimer();
    }

    openExternalCalculator() {
        window.open('https://www.online-calculator.com/full-screen-calculator/', '_blank', 'width=400,height=600');
    }

    selectedAnswers: { [key: number]: any } = {};
    selectedIndex: number = 0;

    get selectedQuestion() {
        return this.questions[this.selectedIndex];
    }

    selectQuestionByIndex(index: number) {
        if (index >= 0 && index < this.questions.length) {
            this.selectedIndex = index;
            this.resetTimer()
        }
    }

    selectOption(option: any) {
        const currentQuestion = this.selectedQuestion;
        this.pauseTimer()
        let data = {
            userId:this.userId(),
            questionId:this.questions[this.selectedIndex].id,
            selectedOptionId:option.id,
            timeTakenInSeconds:this.minutes*60 + this.seconds,
        }
        this.answerQuestions.push(data)

        if (!this.selectedAnswers[currentQuestion.id]) {
            this.selectedAnswers[currentQuestion.id] = option;
        }
    }

    isCorrectOption(questionId: number, option: any): boolean {
    return option.isCorrect && this.selectedAnswers[questionId] === option;
    }

    isWrongOption(questionId: number, option: any): boolean {
    return !option.isCorrect && this.selectedAnswers[questionId] === option;
    }

    hasAnswered(questionId: number): boolean {
        return !!this.selectedAnswers[questionId];
    }

    submitExam():void{
        this._QuestionsService.answerQuestions(this.subCategoryId(), this.answerQuestions).subscribe({
            next:(res)=>{
                console.log(res);
                this.answerReport = res
                this.openModal()
                this.pauseTimer()
            },
            error:(err)=>{
                this._Router.navigate(['/apps/subcategory/' + this.categoryId()])
            }
        })
    }

    openModal(): void {
      this.modalVisible = true;
    }
    closeModal(): void {
      this.modalVisible = false;
    }
}
