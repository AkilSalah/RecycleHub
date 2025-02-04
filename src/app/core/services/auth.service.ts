import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'users';

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
}
