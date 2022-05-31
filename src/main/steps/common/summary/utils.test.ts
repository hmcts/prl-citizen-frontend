import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CONSENT, MIAM_START } from '../../urls';

import { summaryList } from './utils';

const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
    applicationReceivedDate: 'When did you receive the application?',
    invalidApplicationReceivedDate: 'When did you receive the application?',
  },
  errors: {},
};

const urls = {
  miamStart: MIAM_START,
  applicationReceivedDate: CONSENT,
  invalidApplicationReceivedDate: CONSENT,
};

const fieldType = {
  miamStart: 'String',
  applicationReceivedDate: 'Date',
  invalidApplicationReceivedDate: 'Date',
};

describe('common > summary > utils', () => {
  describe('SummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/respondent/miam/miam-start',
                    text: 'edit',
                    visuallyHiddenText: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
                  },
                ],
              },
              key: { text: 'What is a Mediation Information and Assessment Meeting (MIAM)?' },
              value: { text: 'Yes' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/respondent/consent-to-application',
                    text: 'edit',
                    visuallyHiddenText: 'When did you receive the application?',
                  },
                ],
              },
              key: { text: 'When did you receive the application?' },
              value: { text: '11 March 2022' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/respondent/consent-to-application',
                    text: 'edit',
                    visuallyHiddenText: 'When did you receive the application?',
                  },
                ],
              },
              key: { text: 'When did you receive the application?' },
              value: {},
            },
          ],
          title: 'applicationDetails',
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(summaryList(enContent, userCase, urls, 'applicationDetails', fieldType, 'en')).toStrictEqual(expected);
    });
  });
});
