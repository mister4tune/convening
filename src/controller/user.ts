import {
  Provide,
  Inject,
  Put,
  Controller,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { IUserService, IUser } from '../interface';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: IUserService;

  @Put('/')
  async register(@Body(ALL) user: IUser): Promise<IUser> {
    return await this.userService.register(user);
  }
}
