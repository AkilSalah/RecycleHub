import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const currentUser = this.authService.getCurrentUser();
    const expectedRole = route.data.expectedRole;

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { error: 'unauthorized' } });
      return false;
    }
  }

}
