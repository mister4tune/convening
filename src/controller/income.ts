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
  IIncome,
  IIncomeOptions,
  IIncomeService,
  IUserService,
} from '../interface';
import { MyContext } from '../types/context';
import { ErrorResult, Result } from '../types/result';

@Provide()
@Controller('/income')
export class IncomeController {
  @Inject()
  userService: IUserService;
  @Inject()
  IncomeService: IIncomeService;

  @Put('/', { middleware: ['authMiddleware'] })
  async createIncome(ctx: MyContext, @Body(ALL) Income: IIncome) {
    if (Income.income) {
      try {
        const newIncome = await this.IncomeService.createIncome(Income);
        if (newIncome) {
          ctx.response.status = 201;
          ctx.body = new Result(201, newIncome, '创建成功');
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
  async amendIncome(
    ctx: MyContext,
    @Body('comments') comments: string,
    @Param('rid') rid: number
  ) {
    try {
      await this.IncomeService.amendIncome(comments, rid);
      ctx.response.status = 200;
      ctx.body = new Result(200, {}, '修改成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
  @Get('/', { middleware: ['authMiddleware'] })
  async findIncome(ctx: MyContext, @Query(ALL) options: IIncomeOptions) {
    try {
      const result = await this.IncomeService.findIncome(options);
      ctx.body = new Result(
        200,
        await Promise.all(
          result.map(async Income => {
            (Income.quantity as any) = this.userService.desensitation(
              await this.userService.findById(Income.quantity)
            );
            Income.quantity = this.userService.desensitation(
              Income.quantity as any
            );
            return Income;
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
      await this.IncomeService.delete(target);
      ctx.response.status = 202;
      ctx.body = new Result(202, {}, '删除成功');
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = new ErrorResult(error);
    }
  }
}
