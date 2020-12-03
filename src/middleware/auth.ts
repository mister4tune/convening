import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'vm';
import { Result } from '../types/result';

@Provide()
export class AuthMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      if (ctx.session.user) {
        await next();
      } else {
        ctx.response.status = 401;
        ctx.body = new Result(401, {}, '未登录');
      }
    };
  }
}
