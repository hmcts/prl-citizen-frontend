import { CommonContent } from '../common.content';

import { form, generateContent } from './content';

const en = {
  title: 'For your security, we signed you out',
  signIn: 'Sign in',
};

const cy = {
  title: 'Er eich diogelwch, gwnaethom eich allgofnodi',
  signIn: 'Mewngofnodi',
};

describe('signed out due to session timed out', () => {
  test('returns English content correctly', () => {
    const content = { language: 'en' } as CommonContent;
    const result = generateContent(content);

    expect(result.title).toBe(en.title);
    expect(result.signIn).toBe(en.signIn);
    expect(result.form).toBe(form);
  });

  test('returns Welsh content correctly', () => {
    const content = { language: 'cy' } as CommonContent;
    const result = generateContent(content);

    expect(result.title).toBe(cy.title);
    expect(result.signIn).toBe(cy.signIn);
    expect(result.form).toBe(form);
  });
});
