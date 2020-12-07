import { Provide, Inject } from '@midwayjs/decorator';
import { IRequestPayload, IRequestService } from '../interface';
import { ConveningModel } from '../model/convening';
import { IRequestModel, RequestModel } from '../model/request';

@Provide()
export class RequestService implements IRequestService {
  @Inject()
  RequestModel: IRequestModel;
  async createRequest(payload: IRequestPayload): Promise<RequestModel> {
    const convening = await ConveningModel.findByPk(payload.cid);
    return await this.RequestModel.create({
      ...payload,
      uid: convening.owner,
    });
  }
  async amendRequest(updatePost: string, rid: number) {
    const request = await this.RequestModel.findByPk(rid);
    request.comments = updatePost ?? request.comments;
    await request.save();
    return request;
  }
  async delete(target: number) {
    await this.RequestModel.destroy({
      where: {
        rid: target,
      },
    });
  }
}
