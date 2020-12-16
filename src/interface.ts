import { ConveningModel } from './model/convening';
import { IncomeModel } from './model/income';
import { InfoModel } from './model/info';
import { RequestModel } from './model/request';
import { UserModel } from './model/user';

export interface IUserOptions {
  nickname: string;
  pwd: string;
  userName: string;
  licenseType: string;
  licenseId: string;
  phone: string;
  introduction?: string;
  city?: string;
}

export interface IUserAmendPayload {
  phone?: string;
  pwd?: string;
  introduction?: string;
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
  type?: string;
  name?: string;
  introduction?: string;
  crowdNumber?: number;
  endtime?: Date;
  status?: string;
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
  response(payload: IResponsePayload): Promise<boolean>;
  findRequest(options: IRequestOptions): Promise<RequestModel[]>;
}

export interface IRequestPayload {
  cid: number;
  comments?: string;
}

export interface IResponsePayload {
  cid: number;
  rid: number;
  accept: boolean | string;
}

export interface IRequestOptions {
  cid?: number;
  rid?: number;
  uid?: number;
  status?: string;
}

export interface IIncomeService {
  createIncome(payload: IIncomePayload): Promise<IncomeModel>;
  amendIncome(updatePost: string, rid: number);
  findIncome(options: IIncomeOptions): Promise<IncomeModel[]>;
  delete(target: number);
}

export interface IIncomePayload {
  quantity: number;
  income: number;
  type: string;
  ctype: string;
  city: string;
  date: Date;
}

export interface IIncomeOptions {
  quantity: number;
  income: number;
  type: string;
  ctype: string;
  city: string;
  date: Date;
}

export interface IInfoService {
  createInfo(payload: IInfoPayload): Promise<InfoModel>;
  amendInfo(updatePost: string, rid: number);
  findInfo(options: IInfoOptions): Promise<InfoModel[]>;
  delete(target: number);
}

export interface IInfoPayload {
  owner: number;
  contractor: number;
  date: Date;
}

export interface IInfoOptions {
  owner: number;
  contractor: number;
  date: Date;
}

export type IUser = UserModel;

export type IConvening = ConveningModel;

export type IRequest = RequestModel;

export type IIncome = IncomeModel;

export type IInfo = InfoModel;
