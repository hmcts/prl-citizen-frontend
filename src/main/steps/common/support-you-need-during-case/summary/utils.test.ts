import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CA_DA_LANGUAGE_REQUIREMENTS } from '../../../urls';

import { summaryList } from './utils';

const enContent = {
  section: 'Check your answers',
  title: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
  },
  keys: {
    languageRequirements: 'Do you have any language requirements?',
    languageDetails: 'Give details of the language you require (including dialect, if applicable)',
  },
  fieldType: {
    languageRequirements: 'String',
    languageDetails: 'String',
  },
  errors: {},
};

const urls = {
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
  languageDetails: CA_DA_LANGUAGE_REQUIREMENTS,
};

describe('common > summary > utils', () => {
  describe('SummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'About you',
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/respondent/support-you-need-during-case/language-requirements',
                    text: 'Edit',
                    visuallyHiddenText: 'Do you have any language requirements?',
                  },
                ],
              },
              key: { text: 'Do you have any language requirements?' },
              value: {},
            },
            {
              actions: {
                items: [
                  {
                    href: '/respondent/support-you-need-during-case/language-requirements',
                    text: 'Edit',
                    visuallyHiddenText: 'Give details of the language you require (including dialect, if applicable)',
                  },
                ],
              },
              key: { text: 'Give details of the language you require (including dialect, if applicable)' },
              value: {},
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(summaryList(enContent, userCase, urls, 'About you')).toStrictEqual(expected);
    });
  });
});
