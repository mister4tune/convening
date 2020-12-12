import {
  Provide,
  Inject,
  Controller,
  ALL,
  Put,
  Body,
  Post,
  Param,
  Del,
} from '@midwayjs/decorator';
import {
  IConveningService,
  IRequest,
  IRequestService,
  IResponsePayload,
  IUserService,
} from '../interface';
import { MyContext } from '../types/context';
import { ErrorResult, Result } from '../types/result';

@Provide()
@Controller('/request')
export class RequestController {
  @Inject()
  conveningService: IConveningService;
  @Inject()
  userService: IUserService;
  @Inject()
  requestService: IRequestService;

  @Put('/', { middleware: ['authMiddleware'] })
  async createRequest(ctx: MyContext, @Body(ALL) request: IRequest) {
    if (request.cid) {
      try {
        const newRequest = this.requestService.createRequest(request);
        if (newRequest) {
          ctx.response.status = 201;
          ctx.body = new Result(201, newRequest, '创建成功');
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
  @Post('/amend/:rid', { middleware: ['authMiddleware'] })
  async amendRequest(
    ctx: MyContext,
    @Body('comments') comments: string,
    @Param('rid') rid: number
  ) {
    try {
      await this.requestService.amendRequest(comments, rid);
      ctx.response.status = 200;
      ctx.body = new Result(200, {}, '修改成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
  @Post('/response', { middleware: ['authMiddleware'] })
  async responseRequest(ctx: MyContext, @Body(ALL) payload: IResponsePayload) {
    if (payload.cid && payload.rid) {
      try {
        const toResponse = this.requestService.response(payload);
        if ((await toResponse).valueOf) {
          ctx.response.status = 200;
          ctx.body = new Result(200, {}, '修改成功');
        } else {
          ctx.response.status = 400;
          ctx.body = new Result(400, {}, '请求体无效');
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
  @Del('/:target', { middleware: ['authMiddleware'] })
  async delete(ctx: MyContext, @Param('target') target: number) {
    try {
      await this.requestService.delete(target);
      ctx.response.status = 202;
      ctx.body = new Result(202, {}, '删除成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
}
