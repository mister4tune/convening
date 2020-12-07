import { ConveningModel } from './model/convening';
import { RequestModel } from './model/request';
import { UserModel } from './model/user';

export interface IUserOptions {
  nickname: string;
  pwd: string;
  userName: string;
  licenseType: string;
  licenseId: string;
  phone: string;
}

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

export interface IConveningCreation {
  owner: number;
  type: string;
  name: string;
  introduction: string;
  crowdNumber: number;
  endtime: Date;
}
export interface IConveningAmendPayload {
  type: string;
  name: string;
  introduction: string;
  crowdNumber: number;
  endtime: Date;
}

export interface IConveningService {
  normalSelect(options: IConveningOptions): Promise<ConveningModel[]>;
  createConvening(options: IConveningOptions): Promise<ConveningModel>;
  validConvening(convening: IConvening): boolean;
  amend(conveningAmend: IConveningAmendPayload, target: number);
  delete(target: number);
}
export interface IResult {
  code: number;
  data: any;
  msg: string;
}

export interface IRequestService {
  createRequest(payload: IRequestPayload): Promise<RequestModel>;
  amendRequest(updatePost: string, rid: number);
  delete(target: number);
}

export interface IRequestPayload {
  cid: number;
  comments?: string;
}

export type IUser = UserModel;

export type IConvening = ConveningModel;

export type IRequest = RequestModel;
