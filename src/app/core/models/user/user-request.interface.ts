export interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    userId: string;
    isActive: boolean;
    emailConfirmed: boolean;
  }