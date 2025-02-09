import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { HomeComponent } from './features/views/home/home.component';
import { RequestCollectComponent } from './features/collect/request-collect/request-collect.component';
import { CollectionProcessComponent } from './features/collect/collection-process/collection-process.component';
import { CollectPointsComponent } from './features/point/collect-points/collect-points.component';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { 
    path: 'particulier/request_collect', 
    component: RequestCollectComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'particulier' } 
  },
  { 
    path: 'collecteur/process_collect', 
    component: CollectionProcessComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'collecteur' } 
  },
  { 
    path: 'point_collect', 
    component: CollectPointsComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'particulier' } 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
