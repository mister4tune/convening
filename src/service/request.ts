import { Provide, Inject } from '@midwayjs/decorator';
import {
  IRequestPayload,
  IRequestService,
  IResponsePayload,
} from '../interface';
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
  async response(payload: IResponsePayload): Promise<boolean> {
    const convening = await ConveningModel.findByPk(payload.cid);
    const request = await this.RequestModel.findByPk(payload.rid);
    const responsedRequests = await this.RequestModel.findAll({
      where: {
        cid: payload.cid,
        status: 'accepted',
      },
    });
    if (request.cid !== convening.cid) return false;
    else {
      if (JSON.parse(payload.accept as string) === false) {
        request.status = 'rejected';
        await request.save();
        return true;
      } else {
        if (convening.crowdNumber > responsedRequests.length) {
          request.status = 'accepted';
          await request.save();
          return true;
        } else return false;
      }
    }
  }
}
