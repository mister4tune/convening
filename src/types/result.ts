import { IResult } from '../interface';
export class Result implements IResult {
  code: number;
  data: any;
  msg: string;

  constructor(code: number, data: any, msg: string) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }
}

export class ErrorResult extends Result {
  constructor(e?: any) {
    if (e) {
      super(500, e, e.toString());
    } else {
      super(500, {}, 'Unknown error');
    }
  }
}
