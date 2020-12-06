import {
  Provide,
  Inject,
  Controller,
  ALL,
  Get,
  Query,
} from '@midwayjs/decorator';
import {
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
}
