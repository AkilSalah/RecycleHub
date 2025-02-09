import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthDate: ['', Validators.required],
      city : ['', Validators.required],
      points: [0, Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: User = {
        id: 0, 
        ...this.registerForm.value,
        role: 'particulier', 
        points: this.registerForm.value.points || 0 
      };

      this.authService.register(newUser); 
      this.router.navigate(['/login']); 
    }
  }
}
