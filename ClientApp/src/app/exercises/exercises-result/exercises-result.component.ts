import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/_models/student';
import { EnteringService } from 'src/app/_services/entering.service';
import { PointingService } from 'src/app/_services/pointing.service';
import { SlideringService } from 'src/app/_services/slidering.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-exercises-result',
  templateUrl: './exercises-result.component.html',
  styleUrls: ['./exercises-result.component.css']
})
export class ExercisesResultComponent implements OnInit {

  private student: Student;

  constructor(private slideringService: SlideringService, private pointingService: PointingService, private enteringService: EnteringService, private studentService: StudentService) {
    this.student = this.studentService.currentStudentValue;
  }

  ngOnInit() {
  }

  downloadSlideringResult() {
    this.slideringService.downloadSlideringResult(this.student.id)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = this.student.surname + "_" + this.student.studentNumber + "_TEST_PRZECIAGANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  downloadPointingResult() {
    this.pointingService.downloadPointingResult(this.student.id)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = this.student.surname + "_" + this.student.studentNumber + "_TEST_WSKAZYWANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

  downloadEnteringResult() {
    this.enteringService.downloadEnteringResult(this.student.id)
      .subscribe(x => {
        var newBlob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = this.student.surname + "_" + this.student.studentNumber + "_TEST_WPROWADZANIA.xlsx";
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }

}
