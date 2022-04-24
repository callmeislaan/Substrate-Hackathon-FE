export type User = {
  id: number | null;
  fullName: string;
  gender: boolean;
  username: string;
  avatar: string | null;
} | null;

export type Users = User[] | null;
