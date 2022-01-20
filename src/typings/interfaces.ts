export interface IUser {
  loading: boolean;
  userData: any | null;
  error: string | undefined;
  isLoginnedUser: boolean;
}
export interface IAuthData {
  email: string;
  password: string;
}
