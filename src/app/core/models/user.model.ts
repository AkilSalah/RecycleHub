export interface User {
    id: number; 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string;
    address: string; 
    phoneNumber: string;
    birthDate: Date;
    role: 'particulier' | 'collecteur';
  }