import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PackagesService } from 'src/app/service/packages/packages.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink, NgFor, NgStyle],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit {
    private readonly _PackagesService = inject(PackagesService)

    allPackages:any[] = []

    ngOnInit(): void {
        this.getAllPackage()
    }

    getAllPackage():void{
        this._PackagesService.getAllPackages().subscribe({
            next:(res)=>{
                this.allPackages = res.data
            }
        })
    }

    courseData = [
        {
          id: 1,
          courseImage: "../../../assets/images/packages-image/course-1.jpg",
          listImg: "assets/img/course/list/course_list_1.jpeg",
          lesson: "43",
          title: "Auditing procedures, risk assessment, and internal controls.",
          rating: "4.5",
          teacherImg: "assets/img/course/teacher/teacher-1.jpg",
          teacherName: "Jim Séchen",
          category: "AUD",
          price: "35.00",
          oldPrice: "70.00",
          color: "#B128FF"
        },
        {
          id: 2,
          courseImage: "../../../assets/images/packages-image/course-2.jpg",
          listImg: "assets/img/course/list/course_list_2.jpeg",
          lesson: "72",
          title: "Financial accounting, reporting, and preparing financial statements.",
          rating: "4.0",
          teacherImg: "assets/img/course/teacher/teacher-2.jpg",
          teacherName: "Barry Tone",
          category: "FAR",
          price: "35.00",
          oldPrice: "70.00",
          color: "#0FA0DD"
        },
        {
          id: 3,
          courseImage: "../../../assets/images/packages-image/course-3.jpg",
          listImg: "assets/img/course/list/course_list_3.jpeg",
          lesson: "35",
          title: "Business laws, taxation, and ethics for accountants.",
          rating: "4.3",
          teacherImg: "assets/img/course/teacher/teacher-3.jpg",
          teacherName: "Samuel Serif",
          category: "REG",
          price: "35.00",
          oldPrice: "70.00",
          color: "#30A820"
        },
        {
          id: 4,
          courseImage: "../../../assets/images/packages-image/course-4.jpg",
          listImg: "assets/img/course/list/course_list_4.jpeg",
          lesson: "60",
          title: "Financial reporting, data analysis, and business performance.",
          rating: "3.5",
          teacherImg: "assets/img/course/teacher/teacher-4.jpg",
          teacherName: "Elon Gated",
          category: "BAR",
          price: "35.00",
          oldPrice: "70.00",
          color: "#3B60FF"
        },
        {
          id: 5,
          courseImage: "../../../assets/images/packages-image/course-5.jpg",
          listImg: "assets/img/course/list/course_list_5.jpeg",
          lesson: "28",
          title: "IT in accounting, cybersecurity, and internal control frameworks.",
          rating: "4.5",
          teacherImg: "assets/img/course/teacher/teacher-5.jpg",
          teacherName: "Eleanor Fant",
          category: "ISC",
          price: "35.00",
          oldPrice: "70.00",
          color: "orange"
        },
        {
          id: 6,
          courseImage: "../../../assets/images/packages-image/course-6.jpg",
          listImg: "assets/img/course/list/course_list_6.jpeg",
          lesson: "38",
          title: "Tax compliance, filing requirements, and planning strategies.",
          rating: "4.8",
          teacherImg: "assets/img/course/teacher/teacher-6.jpg",
          teacherName: "Brian Cumin",
          category: "TCP",
          price: "35.00",
          oldPrice: "70.00",
          color: "pink"
        },
        {
          id: 7,
          courseImage: "../../../assets/images/packages-image/course-7.jpg",
          listImg: "assets/img/course/list/course_list_7.jpeg",
          lesson: "26",
          title: "Build your media and Public presence.",
          rating: "4.6",
          teacherImg: "assets/img/course/teacher/teacher-7.jpg",
          teacherName: "Pelican Steve",
          category: "Audio & Music",
          price: "35.00",
          oldPrice: "70.00",
          color: "orange"
        },
        {
          id: 8,
          courseImage: "../../../assets/images/packages-image/course-8.jpg",
          listImg: "assets/img/course/list/course_list_8.jpeg",
          lesson: "13",
          title: "Creative writing through Storytelling",
          rating: "4.4",
          teacherImg: "assets/img/course/teacher/teacher-8.jpg",
          teacherName: "Shahnewaz Sakil",
          category: "Mechanical",
          price: "35.00",
          oldPrice: "70.00",
          color: "pink"
        },
        {
          id: 9,
          courseImage: "assets/img/course/course-9.jpg",
          listImg: "../../../assets/images/packages-image/course-9.jpg",
          lesson: "25",
          title: "Product Manager Learn the Skills & job.",
          rating: "4.2",
          teacherImg: "assets/img/course/teacher/teacher-9.jpg",
          teacherName: "Hilary Ouse",
          category: "Lifestyle",
          price: "35.00",
          oldPrice: "70.00",
          color: "#F2277E"
        }
      ]
}
