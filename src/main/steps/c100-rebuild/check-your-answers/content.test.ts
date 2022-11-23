import { cyContent, enContent } from './content';

/* eslint-disable @typescript-eslint/ban-types */
describe('Content.ts test cases', () => {
  test('en should be an object', () => {
    expect(typeof enContent).toBe('object');
  });

  test('cy should be an object', () => {
    expect(typeof cyContent).toBe('object');
  });
});
