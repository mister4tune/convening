import { DB } from './model/db';

// build db connections when starting APP
export = app => {
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...');

    await DB.initDB(app.config.sequelize);

    console.log('✅  Your awesome APP launched');
  });
  app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set(key, value, maxAge) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy(key) {
      await app.redis.del(key);
    },
  };
};
