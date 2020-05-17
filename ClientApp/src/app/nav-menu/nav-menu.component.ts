import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private authService: AuthService) { }

  loggedIn() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
