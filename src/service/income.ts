import { Provide, Inject } from '@midwayjs/decorator';
import { IIncomeOptions, IIncomePayload, IIncomeService } from '../interface';
import { ConveningModel } from '../model/convening';
import { IIncomeModel, IncomeModel } from '../model/Income';

@Provide()
export class IncomeService implements IIncomeService {
  @Inject()
  private IncomeModel: IIncomeModel;
  async createIncome(payload: IIncomePayload): Promise<IncomeModel> {
    const convening = await ConveningModel.findByPk(payload.income);
    return await this.IncomeModel.create({
      ...payload,
      uid: convening.owner,
    });
  }
  async amendIncome(updatePost: string, rid: number) {
    const Income = await this.IncomeModel.findByPk(rid);
    await Income.save();
    return Income;
  }
  async findIncome(options: IIncomeOptions): Promise<IncomeModel[]> {
    return await this.IncomeModel.findAll({
      where: { ...options },
    });
  }
  async delete(target: number) {
    await this.IncomeModel.destroy({
      where: {
        rid: target,
      },
    });
  }
}
