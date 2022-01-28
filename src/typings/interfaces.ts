export interface IUser {
  loading: boolean;
  userData: any | null;
  error: string;
  isLoginnedUser: boolean;
  imageURL: null | string;
}
export interface IAuthData {
  email: string;
  password: string;
}
export interface IUserUpdationData {
  userName: string;
  userAvatar: string;
}
export interface IUserUpdateDisplayName {
  userName: string;
}
export interface IUserUploadAvatar {
  userAvatar: string;
}

export interface IWithNotificationProps {
  textNotification?: string;
  isNotificationSuccessVisible: boolean;
  isNotificationErrorVisible: boolean;
}
