export interface ChangePasswordRequest{
  profileId:string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}