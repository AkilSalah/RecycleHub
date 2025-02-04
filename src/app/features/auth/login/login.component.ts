import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb : FormBuilder,
    private authService: AuthService ,
    private router : Router){
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(8)]],
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.authService.login(email, password);
      if (user) {
        if(user.role === 'particulier'){
          console.log('hello particulier ');
          // this.router.navigate(['/particulier-dashboard']);
        }else if(user.role === 'collecteur'){
          console.log('hello collecteur ');
          // this.router.navigate(['/collecteur-dashboard']);
        }
      }else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    }
  }
}

