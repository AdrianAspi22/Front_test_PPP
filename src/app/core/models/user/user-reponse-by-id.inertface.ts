export interface UserByIdResponse{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    userStatus: string;
    emailConfirmed: boolean;
    phoneNumber?: any;
    profilePictureDataUrl?: any;
      
}