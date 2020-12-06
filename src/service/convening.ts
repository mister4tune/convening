import { Provide, Inject } from '@midwayjs/decorator';
///import { Op } from 'sequelize';
import { IConveningOptions, IConveningService } from '../interface';
import { ConveningModel, IConveningModel } from '../model/convening';

@Provide()
export class ConveningService implements IConveningService {
  @Inject()
  ConveningModel: IConveningModel;
  async normalSelect(options: IConveningOptions): Promise<ConveningModel[]> {
    return await this.ConveningModel.findAll({
      where: { ...options },
    });
  }
}
