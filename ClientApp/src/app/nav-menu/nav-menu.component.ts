import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private authService: AuthService, public studentService: StudentService) { }

  loggedIn() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }

  isStudent() {
    const currentStudent = this.studentService.currentStudentValue;
    if (currentStudent) {
      return true;
    } else {
      return false;
    }
  }

}
