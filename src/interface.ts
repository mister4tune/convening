import { UserModel } from './model/user';

export interface IUserOptions {
  nickname: string;
  pwd: string;
  userName: string;
  licenseType: string;
  licenseId: string;
  phone: string;
}

export interface ILoginPayload {
  phone: string;
  pwd: string;
}
export interface IUserService {
  register(options: IUserOptions): Promise<UserModel>;
  validUser(user: IUser): boolean;
  login(payload: ILoginPayload): Promise<UserModel>;
}

export interface IResult {
  code: number;
  data: any;
  msg: string;
}

export type IUser = UserModel;
