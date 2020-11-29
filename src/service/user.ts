import { Provide, Inject } from '@midwayjs/decorator';
import { createHash } from 'crypto';
import { IUserOptions, IUserService } from '../interface';
import { IUserModel } from '../model/user';

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
}
