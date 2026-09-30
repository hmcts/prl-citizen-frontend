import express from 'express';
import request from 'supertest';

import { Helmet } from './index';

describe('Helmet', () => {
  test.each([false, true])('restricts framing and form submissions with developmentMode=%s', async developmentMode => {
    const app = express();
    app.locals.developmentMode = developmentMode;
    new Helmet({ referrerPolicy: 'same-origin' }).enableFor(app);
    app.get('/', (_req, res) => res.send('OK'));

    const response = await request(app).get('/').expect(200);
    const directives = response.headers['content-security-policy'].split(';');

    expect(directives).toContain("frame-ancestors 'none'");
    expect(directives).toContain("form-action 'self'");
  });
});
