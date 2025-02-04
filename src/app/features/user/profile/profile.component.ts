import { Component } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  user: User | null = null; 
  isModalOpen = false;
  profileForm: FormGroup = new FormGroup({});

  constructor(private router : Router, private userService: UserService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  openModal(): void {
    this.isModalOpen = true; 
  }

  closeModal(): void {
    this.isModalOpen = false; 
  }

  getAuthenticatedUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.initForm();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      },
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      fullName: [this.user?.fullName || '', Validators.required], 
      email: [this.user?.email || '', [Validators.required, Validators.email]], 
      address: [this.user?.address || '', Validators.required], 
      phoneNumber: [
        this.user?.phoneNumber || '',
        [Validators.required, Validators.pattern(/^\d{10}$/)], 
      ],
      birthDate: [this.user?.birthDate || '',Validators.required], 
    });
  }

  updateUser(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value }; 
      this.userService.updateUser(updatedUser);
      this.user = updatedUser; 
      this.closeModal(); 
    } else {
      console.log('Formulaire invalide');
    }
  }
  deleteUser(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.userService.deleteUser();
      this.router.navigate(['/login']);
      // alert('Compte supprimé avec succès !');
    }
  }
}
