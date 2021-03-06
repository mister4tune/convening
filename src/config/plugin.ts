import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  session: true,
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
} as EggPlugin;
