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
  },
  fieldType: {
    languageRequirements: 'String',
  },
  errors: {},
};

const urls = {
  languageRequirements: CA_DA_LANGUAGE_REQUIREMENTS,
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
                    href: '/ca-da-respondent/support-you-need-during-case/language-requirements',
                    text: 'Edit',
                    visuallyHiddenText: 'Do you have any language requirements?',
                  },
                ],
              },
              key: { text: 'Do you have any language requirements?' },
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
