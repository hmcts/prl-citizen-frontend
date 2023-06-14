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
    languageDetails: 'Please provide language details',
    reasonableAdjustments:
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    docsDetails: 'Please provide the docs details',
    docsSupport: 'I need documents in an alternative format',
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
        userCase: {
          ...mockUserCase,
          languageRequirements: ['nointerpreter'],
          languageDetails: '',
          reasonableAdjustments: ['docsformat', 'commhelp', 'hearingsupport', 'hearingcomfort', 'travellinghelp'],
          docsSupport: ['docsprint'],
          docsDetails: 'blue',
        },
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
              value: { text: 'No, I do not have any language requirements at this time' },
            },
            {
              key: {
                text: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
              },
              value: {
                text: 'Rwyf angen dogfennau mewn fformat amgen, I need help communicating and understanding, I need to bring support with me to a hearing, I need something to feel comfortable during a hearing, I need help travelling to, or moving around court buildings',
              },
            },
            {
              key: {
                text: 'Please provide the docs details',
              },
              value: {
                text: 'blue',
              },
            },
            {
              key: {
                text: 'I need documents in an alternative format',
              },
              value: {
                text: 'Documents in a specified colour',
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(summaryList(enContent, userCase, urls, 'en', 'About you')).toEqual(expected);
    });
  });
});
