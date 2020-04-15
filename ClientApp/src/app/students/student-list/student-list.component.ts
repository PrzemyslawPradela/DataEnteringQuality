import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/_models/student';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      error => {
        this.alertify.error(error);
      });
  }

}
