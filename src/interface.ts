import { ConveningModel } from './model/convening';
import { UserModel } from './model/user';

export interface IUserOptions {
  nickname: string;
  pwd: string;
  userName: string;
  licenseType: string;
  licenseId: string;
  phone: string;
}

/*
export interface IUserResult {
  uid: number;
  nickname: string;
  userName: string;
  userType: string;
  userLevel: string;
  licenseType: string;
  licenseId: string;
  phone: string;
  city: string;
  introduction: string;
}*/

export interface IUserAmendPayload {
  phone?: string;
  pwd?: string;
  introduvtion?: string;
  city?: string;
}
export interface ILoginPayload {
  nickname: string;
  pwd: string;
}
export interface IUserService {
  register(options: IUserOptions): Promise<UserModel>;
  validUser(user: IUser): boolean;
  login(payload: ILoginPayload): Promise<UserModel>;
  amend(userAmend: IUserAmendPayload, user: UserModel): Promise<UserModel>;
  desensitation(user: IUser);
  findById(id: number): Promise<UserModel>;
}

export interface IConveningOptions {
  owner?: number;
  type?: string;
  name?: string;
  introduction?: string;
  crowdNumber?: number;
  endtime?: Date;
  status?: string;
}

export interface IConveningService {
  normalSelect(options: IConveningOptions): Promise<ConveningModel[]>;
}
export interface IResult {
  code: number;
  data: any;
  msg: string;
}

export type IUser = UserModel;

export type IConvening = ConveningModel;
