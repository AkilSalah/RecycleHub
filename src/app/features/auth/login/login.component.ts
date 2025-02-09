import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router : Router,
    private route : ActivatedRoute,  ){
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'unauthorized') {
        alert('Vous n\'avez pas les permissions nécessaires pour accéder à cette page.');
      }
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.authService.login(email, password);
      if (user) {
        if(user.role === 'particulier'){
          this.router.navigate(['/particulier/request_collect']);
        }else if(user.role === 'collecteur'){
          console.log('hello collecteur ');
          this.router.navigate(['/collecteur/process_collect']);
        }
      }else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    }
  }
}

