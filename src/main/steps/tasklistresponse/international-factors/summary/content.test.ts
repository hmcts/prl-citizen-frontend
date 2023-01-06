import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Check your answers',
  title2: 'International element',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    parents:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    request: 'Has another country asked (or been asked) for information or help for the children?',
    start: "Are the children's lives mainly based outside of England and Wales?",
  },
  errors: {},
};

const cy: typeof en = {
  title: 'Check your answers',
  title2: 'International element',
  sectionTitles: {
    respondentAdditionalInformation: 'International elements',
  },
  keys: {
    jurisdiction:
      'Could another person in the application apply for a similar order in a country outside England or Wales?',
    parents:
      "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
    request: 'Has another country asked (or been asked) for information or help for the children?',
    start: "Are the children's lives mainly based outside of England and Wales?",
  },
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  beforeEach(() => {
    commonContent.userCase = mockUserCase;
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title2).toEqual('International element');
    expect(generatedContent.title).toEqual('Check your answers');
    expect(generatedContent.sectionTitles.respondentAdditionalInformation).toEqual('International elements');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});

/* eslint-enable @typescript-eslint/ban-types */
