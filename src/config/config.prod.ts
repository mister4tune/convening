import { EggAppConfig, PowerPartial } from 'egg';

export type ProdConfig = PowerPartial<EggAppConfig>;

export default () => {
  const config = {} as ProdConfig;

  config.security = {
    csrf: {
      enable: false,
    },
  };

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
