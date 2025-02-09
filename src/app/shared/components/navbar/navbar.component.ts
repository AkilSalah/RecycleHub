import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isParticulier: boolean = false;
  isCollecteur: boolean = false;

  constructor(private authService : AuthService , private router : Router){}
  ngOnInit(): void {
    this.isParticulier = this.authService.isUserRole('particulier');
    this.isCollecteur = this.authService.isUserRole('collecteur');
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
