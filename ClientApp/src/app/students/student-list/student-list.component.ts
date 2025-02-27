import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Student } from 'src/app/_models/student';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { EnteringService } from 'src/app/_services/entering.service';
import { PointingService } from 'src/app/_services/pointing.service';
import { SlideringService } from 'src/app/_services/slidering.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private slideringService: SlideringService,
    private pointingService: PointingService,
    private enteringService: EnteringService) { }

  ngOnInit() {
    this.loadStudents();

    interval(1000).subscribe(
      () => {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
          this.loadStudents();
        }
      })
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

  downloadSlideringResult(studentId: string, studentSurname: string, studentNumber: number) {
    this.slideringService.downloadSlideringResult(studentId)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = studentSurname + "_" + studentNumber + "_TEST_PRZECIAGANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  downloadPointingResult(studentId: string, studentSurname: string, studentNumber: number) {
    this.pointingService.downloadPointingResult(studentId)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = studentSurname + "_" + studentNumber + "_TEST_WSKAZYWANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  downloadEnteringResult(studentId: string, studentSurname: string, studentNumber: number) {
    this.enteringService.downloadEnteringResult(studentId)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = studentSurname + "_" + studentNumber + "_TEST_WPROWADZANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

}
