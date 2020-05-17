import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/_models/student';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  student: Student;

  constructor(private studentService: StudentService, private alertify: AlertifyService, private router: Router) {
    this.student = new Student();
  }

  ngOnInit() {
  }

  register() {
    this.studentService.register(this.student).subscribe(
      () => {
        this.router.navigate(['/zadania']);
      },
      error => {
        this.alertify.error(error);
      });
  }

}
