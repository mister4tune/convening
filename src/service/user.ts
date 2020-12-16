import { Provide, Inject } from '@midwayjs/decorator';
import { createHash } from 'crypto';
import {
  ILoginPayload,
  IUser,
  IUserAmendPayload,
  IUserOptions,
  IUserService,
} from '../interface';
import { IUserModel, UserModel } from '../model/user';

@Provide()
export class UserService implements IUserService {
  @Inject()
  private UserModel: IUserModel;
  async register(options: IUserOptions) {
    const hashedPwd = createHash('md5').update(options.pwd).digest('base64');
    if (options.introduction && options.city)
      return await this.UserModel.create({
        nickname: options.nickname,
        pwd: hashedPwd,
        userName: options.userName,
        licenseType: options.licenseType,
        licenseId: options.licenseId,
        phone: options.phone,
        city: options.city,
        introduction: options.introduction,
      });
    else if (options.introduction && !options.city)
      return await this.UserModel.create({
        nickname: options.nickname,
        pwd: hashedPwd,
        userName: options.userName,
        licenseType: options.licenseType,
        licenseId: options.licenseId,
        phone: options.phone,
        introduction: options.introduction,
      });
    else if (!options.introduction && options.city)
      return await this.UserModel.create({
        nickname: options.nickname,
        pwd: hashedPwd,
        userName: options.userName,
        licenseType: options.licenseType,
        licenseId: options.licenseId,
        phone: options.phone,
        city: options.city,
      });
    else
      return await this.UserModel.create({
        nickname: options.nickname,
        pwd: hashedPwd,
        userName: options.userName,
        licenseType: options.licenseType,
        licenseId: options.licenseId,
        phone: options.phone,
      });
  }

  async login(payload: ILoginPayload): Promise<UserModel> {
    const hashedPwd = createHash('md5').update(payload.pwd).digest('base64');
    return await this.UserModel.findOne({
      where: {
        nickname: payload.nickname,
        pwd: hashedPwd,
      },
    });
  }

  async amend(userAmend: IUserAmendPayload, target: UserModel) {
    const user = await this.UserModel.findByPk(target.uid);
    if (userAmend.pwd)
      user.pwd = createHash('md5').update(userAmend.pwd).digest('base64');
    user.phone = userAmend.phone ?? user.phone;
    user.introduction = userAmend.introduction ?? user.introduction;
    user.city = userAmend.city ?? user.city;
    await user.save();
    if (userAmend.pwd) return null;
    else return user;
  }

  validUser(user: IUser): boolean {
    let result = true;
    result =
      result &&
      !!(
        user.nickname &&
        user.pwd &&
        user.userName &&
        user.licenseType &&
        user.licenseId &&
        user.phone
      );

    result = result && /^1[3|4|5|7|8]\d{9}$/.test(user.phone);
    result =
      result && (user.licenseType === 'ID' || user.licenseType === 'passport');
    return result;
  }

  desensitation(user: IUser) {
    const result = user;
    result.pwd = undefined;
    return result;
  }

  findById(id: number): Promise<UserModel> {
    return this.UserModel.findByPk(id);
  }
}
