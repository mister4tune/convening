import {
  Provide,
  Inject,
  Put,
  Controller,
  Body,
  ALL,
  Post,
  Get,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import {
  IUserService,
  IUser,
  ILoginPayload,
  IUserAmendPayload,
} from '../interface';
import { MyContext } from '../types/context';
import { ErrorResult, Result } from '../types/result';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  private userService: IUserService;

  @Put('/')
  async register(ctx: Context, @Body(ALL) user: IUser) {
    if (this.userService.validUser(user)) {
      try {
        const newUser = await this.userService.register(user);
        if (newUser) {
          ctx.response.status = 201;
          ctx.body = new Result(201, newUser, '注册成功');
        }
      } catch (error) {
        ctx.response.status = 500;
        ctx.body = new ErrorResult(error);
      }
    } else {
      ctx.response.status = 406;
      ctx.body = new Result(406, {}, '请求体无效');
    }
  }
  @Post('/login')
  async login(ctx: MyContext, @Body(ALL) payload: ILoginPayload) {
    if (payload.nickname && payload.pwd) {
      try {
        const user = await this.userService.login(payload);
        if (user) {
          ctx.session.user = user;
          const result = user;
          ctx.body = new Result(
            200,
            this.userService.desensitation(result),
            '登录成功'
          );
        } else {
          ctx.response.status = 403;
          ctx.body = new Result(403, {}, '登录凭据无效');
        }
      } catch (error) {
        ctx.response.status = 500;
        ctx.body = new ErrorResult(error);
      }
    } else {
      ctx.response.status = 406;
      ctx.body = new Result(406, {}, '请求体无效');
    }
  }
  @Post('/amend', { middleware: ['authMiddleware'] })
  async amend(ctx: MyContext, @Body(ALL) userAmend: IUserAmendPayload) {
    if (userAmend) {
      try {
        const user = await this.userService.amend(userAmend, ctx.session.user);
        ctx.session.user = user;
        ctx.response.status = 200;
        ctx.body = new Result(200, {}, '修改成功');
      } catch (error) {
        ctx.response.status = 500;
        ctx.body = new ErrorResult(error);
      }
    } else {
      ctx.response.status = 406;
      ctx.body = new Result(406, {}, '请求体无效');
    }
  }
  @Get('/', { middleware: ['authMiddleware'] })
  async getUserInfo(ctx: MyContext) {
    const result = ctx.session.user;
    return this.userService.desensitation(result);
  }
}
