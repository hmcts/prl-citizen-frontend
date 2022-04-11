import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
const testUrl = process.env.TEST_URL || 'http://localhost:3000';
// TODO: replace this sample test with proper route tests for your application
/* eslint-disable jest/expect-expect */
describe('Home page', () => {
  describe('on GET', () => {
    test('should return sample home page', async () => {
      const response: AxiosResponse = await axios.get(testUrl, {
        headers: {
          'Accept-Encoding': 'gzip',
        },
      });
      expect(response.status).toEqual(200);
    });
  });
});
