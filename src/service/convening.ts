import { Provide, Inject } from '@midwayjs/decorator';
///import { Op } from 'sequelize';
import {
  IConvening,
  IConveningAmendPayload,
  IConveningCreation,
  IConveningOptions,
  IConveningService,
} from '../interface';
import { ConveningModel, IConveningModel } from '../model/convening';

@Provide()
export class ConveningService implements IConveningService {
  @Inject()
  private ConveningModel: IConveningModel;
  async normalSelect(options: IConveningOptions): Promise<ConveningModel[]> {
    return await this.ConveningModel.findAll({
      where: { ...options },
    });
  }
  async createConvening(creation: IConveningCreation): Promise<ConveningModel> {
    return await this.ConveningModel.create({
      ...creation,
    });
  }
  async amend(conveningAmend: IConveningAmendPayload, target: number) {
    const convening = await this.ConveningModel.findByPk(target);
    convening.type = conveningAmend.type ?? convening.type;
    convening.introduction =
      conveningAmend.introduction ?? convening.introduction;
    convening.name = conveningAmend.name ?? convening.name;
    convening.endtime = conveningAmend.endtime ?? convening.endtime;
    convening.crowdNumber = conveningAmend.crowdNumber ?? convening.crowdNumber;
    convening.status = conveningAmend.status ?? convening.status;
    await convening.save();
    return convening;
  }
  validConvening(convening: IConvening): boolean {
    let result = true;
    result =
      result &&
      !!(
        convening.owner &&
        convening.type &&
        convening.endtime &&
        convening.crowdNumber &&
        convening.name
      );
    return result;
  }
  async delete(target: number) {
    await this.ConveningModel.destroy({
      where: {
        cid: target,
      },
    });
  }
}
