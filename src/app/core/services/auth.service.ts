import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  register(user: User): void {
    const users = this.getUsers();
    user.id = this.generateId(users);
    this.saveUsers([...users, user]);
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private generateId(users: User[]): number {
    return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
  login(email : string, password : string):User|null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return user;
    }else {
      return null;
    }
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): Observable<User> | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

}
