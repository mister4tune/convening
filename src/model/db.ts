import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from './user';
interface ISequelizeConfig {
  host: string;
  port: number;
  user: string;
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
      'postgresql://callsys:bupt2017@123.56.226.155:54132/postgres',
      {
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        timezone: '+08:00',
        logging: false,
      }
    );

    // add models here before using them
    DB.sequelize.addModels([UserModel]);

    try {
      await DB.sequelize.authenticate();
    } catch (error) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
