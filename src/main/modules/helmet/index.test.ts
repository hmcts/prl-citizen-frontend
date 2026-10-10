import config from 'config';
import express from 'express';
import request from 'supertest';

import { Helmet } from './index';

describe('Helmet', () => {
  afterEach(() => jest.restoreAllMocks());

  describe.each([
    {
      environment: 'AAT',
      pcqUrl: 'https://pcq.aat.platform.hmcts.net',
      raUrl: 'https://cui-ra.aat.platform.hmcts.net',
      idamUrl: 'https://idam-web-public.aat.platform.hmcts.net/login',
      expectedOrigins: [
        'https://pcq.aat.platform.hmcts.net',
        'https://cui-ra.aat.platform.hmcts.net',
        'https://idam-web-public.aat.platform.hmcts.net',
      ],
    },
    {
      environment: 'production',
      pcqUrl: 'https://pcq.platform.hmcts.net',
      raUrl: 'https://cui-ra.platform.hmcts.net',
      idamUrl: 'https://home.account.hmcts.net/login',
      expectedOrigins: [
        'https://pcq.platform.hmcts.net',
        'https://cui-ra.platform.hmcts.net',
        'https://home.account.hmcts.net',
      ],
    },
    {
      environment: 'local development',
      pcqUrl: 'http://localhost:3002/service-endpoint?language=en',
      raUrl: 'http://localhost:3003/component',
      idamUrl: 'http://localhost:3004/login?client_id=prl',
      expectedOrigins: ['http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004'],
    },
  ])('in $environment', ({ pcqUrl, raUrl, idamUrl, expectedOrigins }) => {
    test.each([false, true])(
      'restricts framing and form submissions with developmentMode=%s',
      async developmentMode => {
        const serviceUrls = {
          'services.equalityAndDiversity.url': pcqUrl,
          'services.reasonableAdjustments.url': raUrl,
          'services.idam.authorizationURL': idamUrl,
        };
        jest.spyOn(config, 'get').mockImplementation(key => serviceUrls[key]);
        const app = express();
        app.locals.developmentMode = developmentMode;
        new Helmet({ referrerPolicy: 'same-origin' }).enableFor(app);
        app.get('/', (_req, res) => res.send('OK'));

        const response = await request(app).get('/').expect(200);
        const directives = response.headers['content-security-policy'].split(';');

        expect(directives).toContain("frame-ancestors 'none'");
        expect(config.get).toHaveBeenCalledWith('services.equalityAndDiversity.url');
        expect(config.get).toHaveBeenCalledWith('services.reasonableAdjustments.url');
        expect(config.get).toHaveBeenCalledWith('services.idam.authorizationURL');
        expect(directives).toContain(
          [
            "form-action 'self'",
            ...expectedOrigins,
            'https://card.payments.service.gov.uk',
            'https://www.familymediationcouncil.org.uk',
            'https://apply-to-court-about-child-arrangements.service.justice.gov.uk',
            'https://c100-application-staging.apps.live-1.cloud-platform.service.justice.gov.uk',
          ].join(' ')
        );
      }
    );
  });
});
