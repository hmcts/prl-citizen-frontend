import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());
   // secret: config.get('session.secret'),
    app.use(
      session({
        name: 'ds-ui-session',
        resave: false,
        saveUninitialized: false,
        secret: 'ddkjwwefkbrkjfbwk',
        cookie: {
          httpOnly: true,
          maxAge: cookieMaxAge,
        },
        rolling: true,
        store: this.getStore(app),
      })
    );
  }

  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        host: redisHost as string,
        password: config.get('session.redis.key') as string,
        port: 6380,
        tls: true,
        connect_timeout: 15000,
      });

      console.log('redis connected');

      app.locals.redisClient = client;
      return new RedisStore({ client });
    }

    return new FileStore({ path: '/tmp' });
  }
}
