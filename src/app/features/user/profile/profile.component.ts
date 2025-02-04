import { Component } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  user: User | null = null; 

  constructor(private router : Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      },
    });
  }

  updateUser(updatedUser: User): void {
    this.userService.updateUser(updatedUser);
    alert('Profil mis à jour avec succès !');
  }

  deleteUser(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.userService.deleteUser();
      this.router.navigate(['/login']);
      // alert('Compte supprimé avec succès !');
    }
  }
}
