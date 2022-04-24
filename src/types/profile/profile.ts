export type Profile = {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  dateOfBirth: number;
  gender: boolean;
  phone: string;
  createdDate: string;
  email: string;
  mentor: boolean;
} | null;

export type Profiles = Profile[] | null;
