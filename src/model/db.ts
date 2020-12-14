import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Sequelize } from 'sequelize-typescript';
import { ConveningModel } from './convening';
import { RequestModel } from './request';
import { UserModel } from './user';
interface ISequelizeConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: string;
}

// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@Scope(ScopeEnum.Singleton)
@Provide('DB')
export class DB {
  public static sequelize: Sequelize;

  public static async initDB(config: ISequelizeConfig) {
    DB.sequelize = new Sequelize(
      `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
      {
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        timezone: '+08:00',
        logging: false,
      }
    );

    // add models here before using them
    DB.sequelize.addModels([UserModel, ConveningModel, RequestModel]);

    try {
      await DB.sequelize.authenticate();
    } catch (error) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
