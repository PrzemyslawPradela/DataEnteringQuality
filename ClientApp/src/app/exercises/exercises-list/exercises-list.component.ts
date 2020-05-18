import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {

  constructor(private studentService: StudentService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  navigateToEnteringSettings() {
    if (this.isStudent()) {
      this.router.navigate(['/zadania/wprowadzanie/ustawienia']);
    } else {
      this.alertifyService.error('Musisz dołączyć do sesji jako student, aby móc wykonać badanie');
    }
  }

  navigateToPointingSettings() {
    if (this.isStudent()) {
      this.router.navigate(['/zadania/wskazywanie/ustawienia']);
    } else {
      this.alertifyService.error('Musisz dołączyć do sesji jako student, aby móc wykonać badanie');
    }
  }

  navigateToSlideringSettings() {
    if (this.isStudent()) {
      this.router.navigate(['/zadania/przeciaganie/ustawienia']);
    } else {
      this.alertifyService.error('Musisz dołączyć do sesji jako student, aby móc wykonać badanie');
    }
  }

  private isStudent() {
    const currentStudent = this.studentService.currentStudentValue;
    if (currentStudent) {
      return true;
    } else {
      return false;
    }
  }

}
