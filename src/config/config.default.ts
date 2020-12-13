import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: process.env.DBNAME || 'callsysdb', //数据库名
    host: process.env.DBHOST || 'localhost',
    port: Number(process.env.DBPORT) || 5432,
    username: process.env.DBUSERNAME || 'callsys', //账号
    password: process.env.DBPWD || 'bupt2017', //密码
  };

  config.redis = {
    client: {
      port: Number(process.env.REDISPORT) || 6379,
      host: process.env.REDISHOST || 'localhost',
      password: process.env.REDISPWD || '', //密码
      db: 0,
    },
  };
  return config;
};
