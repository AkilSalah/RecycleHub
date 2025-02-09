export interface User {
    id: number; 
    email: string; 
    password: string; 
    fullName: string; 
    address: string; 
    city: string
    phoneNumber: string;
    birthDate: Date;
    role: 'particulier' | 'collecteur';
    points : number;
  }