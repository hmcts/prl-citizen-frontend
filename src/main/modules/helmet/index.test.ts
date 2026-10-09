import config from 'config';
import express from 'express';
import request from 'supertest';

import { Helmet } from './index';

describe('Helmet', () => {
  afterEach(() => jest.restoreAllMocks());

  describe.each([
    ['https://pcq.aat.platform.hmcts.net', 'https://pcq.aat.platform.hmcts.net'],
    ['https://pcq.platform.hmcts.net', 'https://pcq.platform.hmcts.net'],
    ['http://localhost:3002/service-endpoint?language=en', 'http://localhost:3002'],
  ])('with PCQ URL %s', (pcqUrl, pcqOrigin) => {
    test.each([false, true])(
      'restricts framing and form submissions with developmentMode=%s',
      async developmentMode => {
        jest.spyOn(config, 'get').mockReturnValue(pcqUrl);
        const app = express();
        app.locals.developmentMode = developmentMode;
        new Helmet({ referrerPolicy: 'same-origin' }).enableFor(app);
        app.get('/', (_req, res) => res.send('OK'));

        const response = await request(app).get('/').expect(200);
        const directives = response.headers['content-security-policy'].split(';');

        expect(directives).toContain("frame-ancestors 'none'");
        expect(config.get).toHaveBeenCalledWith('services.equalityAndDiversity.url');
        expect(directives).toContain(`form-action 'self' ${pcqOrigin} https://card.payments.service.gov.uk`);
      }
    );
  });
});
