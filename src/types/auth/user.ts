interface IUserLogin {
  username: string;
  password: string;
}

interface IUser {
  id: number;
  username: string;
  token: string;
  role: string;
}

export type UserLogin = IUserLogin | null;

export type User = IUser | null;

export type Users = User[] | null;
