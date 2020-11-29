import { UserModel } from './model/user';

export interface IUserOptions {
  nickname: string;
  pwd: string;
  userName: string;
  licenseType: string;
  licenseId: string;
  phone: string;
}

export interface IUserService {
  register(options: IUserOptions): Promise<UserModel>;
}

export type IUser = UserModel;
