import * as express from 'express';
import { Express, RequestHandler } from 'express';
import helmet = require('helmet');

export interface HelmetConfig {
  referrerPolicy: string;
}

const googleAnalyticsDomain = '*.google-analytics.com';
const analyticsGoogleDomain = '*.analytics.google.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const dynatraceDomain = '*.dynatrace.com';
const self = "'self'";

/**
 * Module that enables helmet in the application
 */
export class Helmet {
  constructor(public config: HelmetConfig) {}

  public enableFor(app: Express): void {
    // include default helmet functions
    app.use(helmet() as RequestHandler);

    this.setContentSecurityPolicy(app);
    this.setReferrerPolicy(app, this.config.referrerPolicy);
  }

  private setContentSecurityPolicy(app: express.Express): void {
    const scriptSrc = [
      self,
      ...tagManager,
      googleAnalyticsDomain,
      analyticsGoogleDomain,
      dynatraceDomain,
      "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
      "'sha256-8ctrIyTvZ7de9zUk26J/MrSc7RAEIPzRr2dyC0G7EsM='",
      "'sha256-TFPILXbNme0D+qTcGkihJS9L2peIhUCQ538aLYhYl5M='",
      "'sha256-+jGkATP7t6xhJNXdV47DlBDEiZW3XzQBay4Y5sOfqIk='",
    ];

    if (app.locals.developmentMode) {
      scriptSrc.push("'unsafe-eval'");
    }

    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          connectSrc: [self, googleAnalyticsDomain, analyticsGoogleDomain, dynatraceDomain],
          defaultSrc: ["'none'"],
          fontSrc: [self, 'data:'],
          imgSrc: [self, ...tagManager, googleAnalyticsDomain, analyticsGoogleDomain, dynatraceDomain],
          objectSrc: [self],
          scriptSrc,
          styleSrc: [self, ...tagManager],
        },
      }) as RequestHandler
    );
  }

  private setReferrerPolicy(app: express.Express, policy: string): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    app.use(helmet.referrerPolicy({ policy }) as RequestHandler);
  }
}
