import { fail } from 'assert';

import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';

const testUrl = process.env.TEST_URL || 'http://localhost:3000';

describe('Smoke Test', () => {
  describe('Home page loads', () => {
    test('with correct content', async () => {
      try {
        const response: AxiosResponse = await axios.get(testUrl, {
          headers: {
            'Accept-Encoding': 'gzip',
          },
        });
        expect(response.data).includes(expect.anything());
      } catch {
        fail('Heading not present and/or correct');
      }
    });
  });
});
