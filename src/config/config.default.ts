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
    database: 'callsysdb', //数据库名
    host: '172.24.228.157',
    port: 5432,
    username: 'callsys', //账号
    password: 'bupt2017', //密码
  };

  config.redis = {
    client: {
      port: 6379,
      host: '172.24.228.157',
      password: '', //密码
      db: 0,
    },
  };
  return config;
};
