export interface IUser {
  id?: string | null;
  name?: string;
  username?: string;
  email?: string;
  activated?: boolean | null;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
  password?: string;
  confirmPassword?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: null,
  name: '',
  username: '',
  email: '',
  activated: null,
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
  password: '',
  confirmPassword: '',
};
