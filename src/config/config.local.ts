import { EggAppConfig, PowerPartial } from 'egg';

export type DevConfig = PowerPartial<EggAppConfig>;

export default () => {
  const config = {} as DevConfig;

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'callsysdb', //数据库名
    host: 'localhost',
    port: 5432,
    username: 'callsys', //账号
    password: 'bupt2017', //密码
  };

  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '', //密码
      db: 0,
    },
  };
  return config;
};
