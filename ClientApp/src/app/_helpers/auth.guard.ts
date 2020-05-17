import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      return true;
    }

    this.alertify.error('Brak uprawnień');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
