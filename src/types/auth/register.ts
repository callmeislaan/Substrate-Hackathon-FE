interface RegisterInterface {
  username: string;
  password: string;
  rePassword: string;
  email: string;
  fullName: string;
  dateOfBirth: number | null;
  gender: boolean;
  phone: string;
}

export type Register = RegisterInterface | null;

export type Registers = Register[] | null;
