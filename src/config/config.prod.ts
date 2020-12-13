import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type ProdConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as ProdConfig;
  config.keys = 'conveningServer' + '_{{apikeys}}';

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: process.env.DBNAME, //数据库名
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSERNAM, //账号
    password: process.env.DBPWD, //密码
  };

  config.redis = {
    client: {
      port: Number(process.env.REDISPORT),
      host: process.env.REDISHOST,
      password: process.env.REDISPWD, //密码
      db: 0,
    },
  };
  return config;
};
