import { Provide, Inject } from '@midwayjs/decorator';
import { IInfoOptions, IInfoPayload, IInfoService } from '../interface';
import { ConveningModel } from '../model/convening';
import { IInfoModel, InfoModel } from '../model/Info';

@Provide()
export class InfoService implements IInfoService {
  @Inject()
  private InfoModel: IInfoModel;
  async createInfo(payload: IInfoPayload): Promise<InfoModel> {
    const convening = await ConveningModel.findByPk(payload.contractor);
    return await this.InfoModel.create({
      ...payload,
      uid: convening.owner,
    });
  }
  async amendInfo(updatePost: string, rid: number) {
    const Info = await this.InfoModel.findByPk(rid);
    await Info.save();
    return Info;
  }
  async findInfo(options: IInfoOptions): Promise<InfoModel[]> {
    return await this.InfoModel.findAll({
      where: { ...options },
    });
  }
  async delete(target: number) {
    await this.InfoModel.destroy({
      where: {
        rid: target,
      },
    });
  }
}
