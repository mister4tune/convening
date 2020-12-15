import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type ProdConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as ProdConfig;
  config.keys = 'conveningServer' + '_{{apikeys}}';

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'callsysdb', //数据库名
    host: '172.18.0.2',
    port: 5432,
    username: 'callsys', //账号
    password: 'bupt2017', //密码
  };

  config.redis = {
    client: {
      port: 6379,
      host: '172.18.0.3',
      password: '', //密码
      db: 0,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  return config;
};
