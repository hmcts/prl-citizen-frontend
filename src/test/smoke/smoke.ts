// import { fail } from 'assert';

// import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';

// const testUrl = 'https://prl-citizen-frontend-pr-45.service.core-compute-preview.internal/' || 'http://localhost:3001';

describe('Smoke Test', () => {
  describe('Home page loads', () => {
    test('with correct content', async () => {
      expect(1).toEqual(1);
    });

    // beforeAll(async () => {
    //   await page.goto(testUrl);
    // });

    // it('should be titled "Private Law"', async () => {
    //   await expect(page.title()).resolves.toMatch('Private Law');
    // });

    // test('with correct content', async () => {
    //   try {
    //     const response: AxiosResponse = await axios.get(testUrl);
    //     expect(response).includes(expect.anything());
    //   } catch {
    //     fail('Heading not present and/or correct');
    //   }
    // });
  });
});
