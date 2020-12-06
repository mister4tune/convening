import {
  Provide,
  Inject,
  Controller,
  ALL,
  Get,
  Query,
  Put,
  Body,
  Post,
  Param,
  Del,
} from '@midwayjs/decorator';
import {
  IConvening,
  IConveningAmendPayload,
  IConveningOptions,
  IConveningService,
  IUserService,
} from '../interface';
import { MyContext } from '../types/context';
import { ErrorResult, Result } from '../types/result';

@Provide()
@Controller('/convening')
export class ConveningController {
  @Inject()
  conveningService: IConveningService;
  @Inject()
  userService: IUserService;

  @Get('/normal', { middleware: ['authMiddleware'] })
  async normalSelect(ctx: MyContext, @Query(ALL) options: IConveningOptions) {
    try {
      const result = await this.conveningService.normalSelect(options);
      ctx.body = new Result(
        200,
        await Promise.all(
          result.map(async convening => {
            (convening.owner as any) = this.userService.desensitation(
              await this.userService.findById(convening.owner)
            );
            convening.owner = this.userService.desensitation(
              convening.owner as any
            );
            return convening;
          })
        ),
        ''
      );
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }

  @Put('/', { middleware: ['authMiddleware'] })
  async createConvening(ctx: MyContext, @Body(ALL) convening: IConvening) {
    if (this.conveningService.validConvening(convening)) {
      try {
        const newConvening = await this.conveningService.createConvening(
          convening
        );
        if (newConvening) {
          ctx.response.status = 201;
          ctx.body = new Result(201, newConvening, '创建成功');
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
  @Post('/:target', { middleware: ['authMiddleware'] })
  async amend(
    ctx: MyContext,
    @Body(ALL) conveningAmend: IConveningAmendPayload,
    @Param('target') target: number
  ) {
    if (conveningAmend) {
      try {
        await this.conveningService.amend(conveningAmend, target);
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
  @Del('/:target', { middleware: ['authMiddleware'] })
  async delete(ctx: MyContext, @Param('target') target: number) {
    try {
      await this.conveningService.delete(target);
      ctx.response.status = 202;
      ctx.body = new Result(202, {}, '删除成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
}
