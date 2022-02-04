export interface IUserState {
  loading: boolean;
  userData: any | null;
  error: string;
  isLoginnedUser: boolean;
  imageURL: null | string;
}

export interface IArticle {
  title: string;
}
export interface IAuthData {
  email: string;
  password: string;
}
export interface IArticleData {
  title: string;
  description: string;
  info: string;
  date?: string;
  id?: string;
}
export interface IArticleState {
  articles: any | null;
  errorArticle: string;
  loadingArticle: boolean;
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

export interface IPropsCreateArticle {
  id: string;
}

export interface IArticleManageData {
  created?: number;
  description: string;
  id: string;
  info: string;
  title: string;
  userId?: string;
}
