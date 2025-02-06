import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { HomeComponent } from './features/views/home/home.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { RequestCollectComponent } from './features/collect/request-collect/request-collect.component';

const routes: Routes = [
  {path : 'register', component : RegisterComponent },
  {path : 'login', component : LoginComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'home', component : HomeComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'particulier/request_collect', component: RequestCollectComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
