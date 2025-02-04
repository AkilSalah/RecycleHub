export interface User {
    id: number; 
    email: string; 
    password: string; 
    fullName: string; 
    address: string; 
    phoneNumber: string;
    birthDate: Date;
    role: 'particulier' | 'collecteur';
  }