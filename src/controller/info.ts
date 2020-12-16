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
  Query,
  Get,
} from '@midwayjs/decorator';
import {
  IConveningService,
  IInfo,
  IInfoOptions,
  IInfoService,
  IUserService,
} from '../interface';
import { MyContext } from '../types/context';
import { ErrorResult, Result } from '../types/result';

@Provide()
@Controller('/Info')
export class InfoController {
  @Inject()
  conveningService: IConveningService;
  @Inject()
  userService: IUserService;
  @Inject()
  InfoService: IInfoService;

  @Put('/', { middleware: ['authMiddleware'] })
  async createInfo(ctx: MyContext, @Body(ALL) Info: IInfo) {
    if (Info) {
      try {
        const newInfo = await this.InfoService.createInfo(Info);
        if (newInfo) {
          ctx.response.status = 201;
          ctx.body = new Result(201, newInfo, '创建成功');
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
  async amendInfo(
    ctx: MyContext,
    @Body('comments') comments: string,
    @Param('rid') rid: number
  ) {
    try {
      await this.InfoService.amendInfo(comments, rid);
      ctx.response.status = 200;
      ctx.body = new Result(200, {}, '修改成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
  @Get('/', { middleware: ['authMiddleware'] })
  async findInfo(ctx: MyContext, @Query(ALL) options: IInfoOptions) {
    try {
      const result = await this.InfoService.findInfo(options);
      ctx.body = new Result(
        200,
        await Promise.all(
          result.map(async Info => {
            (Info.contractor as any) = this.userService.desensitation(
              await this.userService.findById(Info.contractor)
            );
            Info.contractor = this.userService.desensitation(
              Info.contractor as any
            );
            return Info;
          })
        ),
        ''
      );
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
  @Del('/:target', { middleware: ['authMiddleware'] })
  async delete(ctx: MyContext, @Param('target') target: number) {
    try {
      await this.InfoService.delete(target);
      ctx.response.status = 202;
      ctx.body = new Result(202, {}, '删除成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
}
