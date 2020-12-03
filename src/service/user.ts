import { Provide, Inject } from '@midwayjs/decorator';
import { createHash } from 'crypto';
import { ILoginPayload, IUser, IUserOptions, IUserService } from '../interface';
import { IUserModel, UserModel } from '../model/user';

@Provide()
export class UserService implements IUserService {
  @Inject()
  UserModel: IUserModel;
  async register(options: IUserOptions) {
    const hashedPwd = createHash('md5').update(options.pwd).digest('base64');
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
        phone: payload.phone,
        pwd: hashedPwd,
      },
    });
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
}
