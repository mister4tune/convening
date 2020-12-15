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
    origin: 'http://localhost:8081',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://localhost:8081'],
  };
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  return config;
};
