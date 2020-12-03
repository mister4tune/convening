import { Context } from 'egg';
export interface MyContext extends Context {
  session: any;
}
