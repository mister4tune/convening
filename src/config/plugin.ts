import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
} as EggPlugin;
