import config from 'config';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import FileStoreFactory from 'session-file-store';

const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());

    app.use(
      session({
        name: 'prl-citizen-frontend-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          ...(config.get('session.secureCookie') === 'true' ? { secure: true } : {}),
          maxAge: cookieMaxAge,
          sameSite: 'lax', // required for the oauth2 redirect
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app),
      })
    );
  }

  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');

    if (redisHost) {
      (async () => {
        const redisClient = createClient({
          socket: {
            host: redisHost as string,
            port: 6380,
            tls: true,
            connectTimeout: 15000,
          },
          password: config.get('session.redis.key') as string,
        });

        await redisClient.connect().catch(err => console.error('Redis Client Error', err));

        app.locals.redisClient = redisClient;

        return new RedisStore({
          client: redisClient,
        });
      })();
    }

    return new FileStore({ path: '/tmp' });
  }
}
