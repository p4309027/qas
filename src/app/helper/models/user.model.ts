export interface UserAuthData {
  email: string;
  password: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  projects?: Array<string>;
  uId?: string;
}
