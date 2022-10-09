import os from 'os';

import healthcheck from '@hmcts/nodejs-healthcheck';
import config from 'config';
import { Application } from 'express';

// Sets up the HMCTS info and health endpoints
export class HealthCheck {
  public enableFor(app: Application): void {
    const redis = app.locals.redisClient
      ? healthcheck.raw(() => (app.locals.redisClient.ping() ? healthcheck.up() : healthcheck.down()))
      : null;

    const idamUrl = config.get('services.idam.tokenURL') as string;

    healthcheck.addTo(app, {
      checks: {
        ...(redis ? { redis } : {}),
        'authProvider-api': healthcheck.web(new URL('/health', config.get('services.authProvider.url'))),
        'idam-api': healthcheck.web(new URL('/health', idamUrl.replace('/o/token', ''))),
        'case-api': healthcheck.web(new URL('/health', config.get('services.case.url'))),
      },
      ...(redis
        ? {
            readinessChecks: {
              redis,
            },
          }
        : {}),
      buildInfo: {
        name: 'prl-citizen-frontend',
        host: os.hostname(),
        uptime: process.uptime(),
      },
    });
  }
}
