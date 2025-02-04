import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private authService : AuthService) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  updateUser(updatedUser: User): void {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  deleteUser(): void {
    const currentUser = this.currentUserSubject.value;
  
    if (currentUser) {
      const users = this.authService.getUsers();
      const updatedUsers = users.filter((user) => user.id !== currentUser.id);
      this.saveUsersToStorage(updatedUsers);
  
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  
      console.log('Utilisateur et toutes ses données supprimés avec succès.');
    } else {
      console.log('Aucun utilisateur connecté.');
    }
  }
  
  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
